/**
 * Canvas Confetti Burst Utility
 * Lightweight, zero-dependency canvas confetti for celebration milestones & quiz streaks
 */

export function triggerConfetti(options = {}) {
  const {
    particleCount = 60,
    spread = 70,
    origin = { x: 0.5, y: 0.6 },
    colors = ['#f2b544', '#0e7490', '#d9544d', '#102b3a', '#5cc8d7', '#f4c15d']
  } = options;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const particles = [];
  const startX = width * origin.x;
  const startY = height * origin.y;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.random() * spread - spread / 2 - 90) * (Math.PI / 180);
    const speed = Math.random() * 12 + 6;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      opacity: 1,
      gravity: 0.35,
      friction: 0.98
    });
  }

  let animationId;
  const startTime = Date.now();
  const duration = 2500;

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      canvas.remove();
      cancelAnimationFrame(animationId);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - elapsed / duration);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    animationId = requestAnimationFrame(render);
  }

  render();
}
