/**
 * NovansJets – Background Map Animation
 * Subtle animated map with flight paths and aircraft icons
 * Only visible on sub-pages (not landing hero)
 */

(function() {
  'use strict';

  /* ─── Config ─── */
  const CONFIG = {
    dotRadius:         2.2,
    dotColor:          'rgba(107, 26, 40, 0.18)',
    lineColor:         'rgba(107, 26, 40, 0.07)',
    planeColor:        'rgba(201, 168, 76, 0.45)',
    helicopterColor:   'rgba(201, 168, 76, 0.35)',
    pathColor:         'rgba(201, 168, 76, 0.12)',
    bgColor:           'transparent',
    animationInterval: 12000,  // ms between new aircraft launches
    planeSpeed:        0.0006, // progress per animation frame
    helicopterSpeed:   0.0004,
    maxActiveFlights:  3,
    gridOpacity:       0.04
  };

  /* ─── Airport / node positions (normalised 0-1) ─── */
  const NODES = [
    { id: 'lhr',  x: 0.47, y: 0.28, label: 'London'       },
    { id: 'jfk',  x: 0.22, y: 0.32, label: 'New York'     },
    { id: 'dxb',  x: 0.62, y: 0.39, label: 'Dubai'        },
    { id: 'syd',  x: 0.84, y: 0.71, label: 'Sydney'       },
    { id: 'hkg',  x: 0.79, y: 0.41, label: 'Hong Kong'    },
    { id: 'cdg',  x: 0.49, y: 0.27, label: 'Paris'        },
    { id: 'sin',  x: 0.76, y: 0.52, label: 'Singapore'    },
    { id: 'gva',  x: 0.50, y: 0.28, label: 'Geneva'       },
    { id: 'mia',  x: 0.24, y: 0.40, label: 'Miami'        },
    { id: 'lax',  x: 0.10, y: 0.37, label: 'Los Angeles'  },
    { id: 'iad',  x: 0.22, y: 0.34, label: 'Washington'   },
    { id: 'tpe',  x: 0.82, y: 0.39, label: 'Taipei'       },
    { id: 'ist',  x: 0.57, y: 0.33, label: 'Istanbul'     },
    { id: 'rio',  x: 0.31, y: 0.63, label: 'Rio'          },
    { id: 'cpt',  x: 0.53, y: 0.68, label: 'Cape Town'    },
    { id: 'mow',  x: 0.60, y: 0.26, label: 'Moscow'       },
    { id: 'bom',  x: 0.65, y: 0.43, label: 'Mumbai'       },
    { id: 'nrt',  x: 0.84, y: 0.34, label: 'Tokyo'        }
  ];

  /* ─── Predefined flight routes ─── */
  const ROUTES = [
    ['lhr', 'jfk'],
    ['lhr', 'dxb'],
    ['jfk', 'lhr'],
    ['dxb', 'hkg'],
    ['cdg', 'mia'],
    ['gva', 'dxb'],
    ['lax', 'jfk'],
    ['lhr', 'sin'],
    ['dxb', 'syd'],
    ['hkg', 'nrt'],
    ['ist', 'dxb'],
    ['mow', 'lhr'],
    ['jfk', 'rio'],
    ['lhr', 'cpt'],
    ['bom', 'sin'],
    ['gva', 'lax']
  ];

  /* ─── State ─── */
  let canvas, ctx, W, H, activeFlights = [], frameId, lastLaunch = 0;
  let isVisible = false;

  /* ─── Init ─── */
  function init() {
    canvas = document.getElementById('map-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', debounce(resize, 200));
    observe();
  }

  /* ─── Observe scroll / visibility ─── */
  function observe() {
    const handler = function() {
      const threshold = window.innerHeight * 0.6;
      if (window.scrollY > threshold && !isVisible) {
        isVisible = true;
        if (canvas) {
          canvas.classList.add('visible');
          draw();
          requestAnimationFrame(loop);
        }
      } else if (window.scrollY <= threshold && isVisible) {
        isVisible = false;
        if (canvas) canvas.classList.remove('visible');
        if (frameId) cancelAnimationFrame(frameId);
      }
    };

    // Also start if already scrolled (e.g. on sub-pages without hero)
    window.addEventListener('scroll', handler, { passive: true });
    // For sub-pages that start at top with no hero
    if (document.body.classList.contains('subpage')) {
      setTimeout(() => {
        isVisible = true;
        if (canvas) {
          canvas.classList.add('visible');
          draw();
          requestAnimationFrame(loop);
        }
      }, 800);
    }
  }

  /* ─── Resize ─── */
  function resize() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  /* ─── Main draw ─── */
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawRoutes();
    drawNodes();
    drawFlights();
  }

  /* ─── Grid ─── */
  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = `rgba(107, 26, 40, ${CONFIG.gridOpacity})`;
    ctx.lineWidth = 0.5;

    const cols = 24, rows = 16;
    for (let c = 0; c <= cols; c++) {
      const x = (c / cols) * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const y = (r / rows) * H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();
  }

  /* ─── Flight route arcs ─── */
  function drawRoutes() {
    ctx.save();
    ctx.strokeStyle = CONFIG.pathColor;
    ctx.lineWidth = 0.8;
    ctx.setLineDash([4, 8]);

    ROUTES.forEach(([fromId, toId]) => {
      const from = nodeById(fromId), to = nodeById(toId);
      if (!from || !to) return;
      const fx = from.x * W, fy = from.y * H;
      const tx = to.x   * W, ty = to.y   * H;
      const cp = arcControlPoint(fx, fy, tx, ty);
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.quadraticCurveTo(cp.x, cp.y, tx, ty);
      ctx.stroke();
    });

    ctx.setLineDash([]);
    ctx.restore();
  }

  /* ─── Airport nodes ─── */
  function drawNodes() {
    NODES.forEach(n => {
      const x = n.x * W, y = n.y * H;

      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, CONFIG.dotRadius * 2.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(107, 26, 40, 0.09)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(x, y, CONFIG.dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.dotColor;
      ctx.fill();
    });
  }

  /* ─── Active flights ─── */
  function drawFlights() {
    activeFlights.forEach(f => {
      if (f.progress < 0 || f.progress > 1) return;
      const pt = flightPosition(f);
      if (f.type === 'helicopter') {
        drawHelicopter(pt.x, pt.y, pt.angle);
      } else {
        drawPlane(pt.x, pt.y, pt.angle);
      }
    });
  }

  /* ─── Plane icon ─── */
  function drawPlane(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = CONFIG.planeColor;
    ctx.beginPath();
    // Simplified side-view plane silhouette
    ctx.moveTo(8, 0);
    ctx.lineTo(-5, -1.5);
    ctx.lineTo(-8, -1.5);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-8, 1.5);
    ctx.lineTo(-5, 1.5);
    ctx.closePath();
    // Wing
    ctx.moveTo(-1, 0);
    ctx.lineTo(-4, -6);
    ctx.lineTo(-6, -6);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-6, 6);
    ctx.lineTo(-4, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /* ─── Helicopter icon ─── */
  function drawHelicopter(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = CONFIG.helicopterColor;
    ctx.strokeStyle = CONFIG.helicopterColor;
    ctx.lineWidth = 0.8;

    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail boom
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(12, 0);
    ctx.stroke();

    // Tail rotor
    ctx.beginPath();
    ctx.moveTo(12, -3);
    ctx.lineTo(12, 3);
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Main rotor blades
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-10, -1);
    ctx.lineTo(10, -1);
    ctx.stroke();

    ctx.restore();
  }

  /* ─── Animation loop ─── */
  function loop(ts) {
    if (!isVisible) return;

    // Launch new flight periodically
    if (ts - lastLaunch > CONFIG.animationInterval && activeFlights.length < CONFIG.maxActiveFlights) {
      launchFlight();
      lastLaunch = ts;
    }

    // Advance flights
    activeFlights = activeFlights.filter(f => f.progress <= 1);
    activeFlights.forEach(f => {
      f.progress += f.speed;
    });

    draw();
    frameId = requestAnimationFrame(loop);
  }

  /* ─── Launch a new flight ─── */
  function launchFlight() {
    const routeIdx = Math.floor(Math.random() * ROUTES.length);
    const route = ROUTES[routeIdx];
    const isHelicopter = Math.random() < 0.2;

    activeFlights.push({
      fromId:    route[0],
      toId:      route[1],
      progress:  0,
      speed:     isHelicopter ? CONFIG.helicopterSpeed : CONFIG.planeSpeed,
      type:      isHelicopter ? 'helicopter' : 'plane'
    });
  }

  /* ─── Get flight position & heading ─── */
  function flightPosition(f) {
    const from = nodeById(f.fromId), to = nodeById(f.toId);
    if (!from || !to) return { x: 0, y: 0, angle: 0 };

    const fx = from.x * W, fy = from.y * H;
    const tx = to.x   * W, ty = to.y   * H;
    const cp = arcControlPoint(fx, fy, tx, ty);
    const t  = f.progress;

    // Quadratic Bezier position
    const x = (1 - t) * (1 - t) * fx + 2 * (1 - t) * t * cp.x + t * t * tx;
    const y = (1 - t) * (1 - t) * fy + 2 * (1 - t) * t * cp.y + t * t * ty;

    // Tangent for heading
    const dt = 0.01;
    const t2 = Math.min(t + dt, 1);
    const x2 = (1 - t2) * (1 - t2) * fx + 2 * (1 - t2) * t2 * cp.x + t2 * t2 * tx;
    const y2 = (1 - t2) * (1 - t2) * fy + 2 * (1 - t2) * t2 * cp.y + t2 * t2 * ty;

    return { x, y, angle: Math.atan2(y2 - y, x2 - x) };
  }

  /* ─── Arc control point ─── */
  function arcControlPoint(fx, fy, tx, ty) {
    const mx = (fx + tx) / 2;
    const my = (fy + ty) / 2;
    const dx = tx - fx, dy = ty - fy;
    const len = Math.sqrt(dx * dx + dy * dy);
    const lift = len * 0.22;
    return {
      x: mx - (dy / len) * lift,
      y: my + (dx / len) * lift
    };
  }

  /* ─── Helpers ─── */
  function nodeById(id) { return NODES.find(n => n.id === id); }

  function debounce(fn, delay) {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /* ─── Kick off ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
