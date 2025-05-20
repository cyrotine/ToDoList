import React, { useEffect, useRef } from 'react';

const ParticlesGrab = ({ config }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    const pxratio = window.devicePixelRatio || 1;

    let width = canvasEl.offsetWidth * pxratio;
    let height = canvasEl.offsetHeight * pxratio;
    canvasEl.width = width;
    canvasEl.height = height;

    const particles = [];

    const particleCount = config?.particles?.number?.value || 100;
    const particleSize = config?.particles?.size?.value || 3;
    const opacity = config?.particles?.opacity?.value || 1;
    const lineDistance = config?.interactivity?.modes?.grab?.distance || 100;
    const lineOpacity = config?.interactivity?.modes?.grab?.line_linked?.opacity || 1;
    const lineColor = config?.particles?.line_linked?.color || '#ffffff';

    const colorRgb = {
      r: parseInt(lineColor.slice(1, 3), 16),
      g: parseInt(lineColor.slice(3, 5), 16),
      b: parseInt(lineColor.slice(5, 7), 16)
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
      });
    }

    const mouse = { x: null, y: null };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

if ((p.x < 0 || p.x > width) || (p.y < 0 || p.y > height)) {
  // Remove the current particle
  particles.splice(particles.indexOf(p), 1);

  // Add a new one
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2.5,
    vy: (Math.random() - 0.5) * 2.5,
  });
}

 

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();

        // Draw line to mouse if close
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lineDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${lineOpacity * (1 - dist / lineDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

// Draw lines between nearby particles
for (let i = 0; i < particles.length; i++) {
  for (let j = i + 1; j < particles.length; j++) {
    const dx = particles[i].x - particles[j].x;
    const dy = particles[i].y - particles[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(particles[j].x, particles[j].y);
      ctx.strokeStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.01 * lineOpacity * (1 - dist / lineDistance)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}


      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = e => {
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * pxratio;
      mouse.y = (e.clientY - rect.top) * pxratio;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvasEl.offsetWidth * pxratio;
      height = canvasEl.offsetHeight * pxratio;
      canvasEl.width = width;
      canvasEl.height = height;
    };

    window.addEventListener('resize', handleResize);
    canvasEl.addEventListener('mousemove', handleMouseMove);
    canvasEl.addEventListener('mouseleave', handleMouseLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mousemove', handleMouseMove);
      canvasEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [config]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default ParticlesGrab;
