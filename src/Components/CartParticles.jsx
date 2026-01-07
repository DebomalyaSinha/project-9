import React, { useState, useEffect } from 'react';

const CartParticles = ({ x, y, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      angle: (Math.PI * 2 * i) / 12,
      speed: 2 + Math.random() * 2
    }));
    setParticles(newParticles);

    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 9999 }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#2563eb',
            animation: `particle-burst 0.8s ease-out forwards`,
            transform: `translate(${Math.cos(p.angle) * 50}px, ${Math.sin(p.angle) * 50}px)`,
            opacity: 0
          }}
        />
      ))}
      <style>{`
        @keyframes particle-burst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CartParticles;