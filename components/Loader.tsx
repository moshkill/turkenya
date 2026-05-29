'use client';
import { useState, useEffect } from 'react';

const COLS = 4;
const ROWS = 2;
const W = 360; // display width px
const H = 90;  // display height px
const PW = W / COLS;
const PH = H / ROWS;

// Direction each piece flies in from
const origins = [
  { x: -120, y: -100, r: -12 },  // 0: top-left corner
  { x: 0,    y: -120, r: 6  },   // 1: top
  { x: 0,    y: -120, r: -4 },   // 2: top
  { x: 120,  y: -100, r: 10 },   // 3: top-right
  { x: -120, y:  100, r: 8  },   // 4: bottom-left
  { x: 0,    y:  120, r: -6 },   // 5: bottom
  { x: 0,    y:  120, r: 4  },   // 6: bottom
  { x: 120,  y:  100, r: -10 },  // 7: bottom-right
];

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [assembled, setAssembled] = useState<number[]>([]);
  const [showTag, setShowTag] = useState(false);

  useEffect(() => {
    // Assemble pieces one by one with stagger
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      timers.push(setTimeout(() => {
        setAssembled(prev => [...prev, i]);
      }, 200 + i * 110));
    }
    // Show tagline after all pieces land
    timers.push(setTimeout(() => setShowTag(true), 200 + COLS * ROWS * 110 + 200));
    // Fade out
    timers.push(setTimeout(() => setFadeOut(true), 2800));
    timers.push(setTimeout(() => setVisible(false), 3500));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0D0D0D',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.7s ease',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <style>{`
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40%            { transform: translateY(-7px); opacity: 1; }
        }
        @keyframes flashIn {
          0%   { box-shadow: 0 0 0 0 rgba(255,240,0,0.6); }
          100% { box-shadow: 0 0 32px 8px rgba(255,240,0,0); }
        }
      `}</style>

      {/* Puzzle logo */}
      <div style={{
        position: 'relative',
        width: W, height: H,
        maxWidth: '85vw',
        marginBottom: 32,
        // Flash when fully assembled
        animation: assembled.length === COLS * ROWS ? 'flashIn 0.5s ease forwards' : 'none',
      }}>
        {Array.from({ length: COLS * ROWS }).map((_, idx) => {
          const col = idx % COLS;
          const row = Math.floor(idx / COLS);
          const isIn = assembled.includes(idx);
          const origin = origins[idx];

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: col * PW,
                top: row * PH,
                width: PW,
                height: PH,
                backgroundImage: 'url(/logo.png)',
                backgroundSize: `${W}px ${H}px`,
                backgroundPosition: `${-col * PW}px ${-row * PH}px`,
                backgroundRepeat: 'no-repeat',
                opacity: isIn ? 1 : 0,
                transform: isIn
                  ? 'translate(0, 0) rotate(0deg) scale(1)'
                  : `translate(${origin.x}px, ${origin.y}px) rotate(${origin.r}deg) scale(0.85)`,
                transition: isIn
                  ? 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease'
                  : 'none',
                // Thin gap between pieces while assembling, closes on arrival
                outline: isIn ? '0.5px solid rgba(13,13,13,0.3)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 5,
        textTransform: 'uppercase',
        marginBottom: 36,
        opacity: showTag ? 1 : 0,
        transform: showTag ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        Creating Memories
      </div>

      {/* Progress bar */}
      <div style={{
        width: 180, height: 2,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2, overflow: 'hidden',
        marginBottom: 18,
        opacity: showTag ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{
          height: '100%', background: '#fff000', borderRadius: 2,
          animation: showTag ? 'barGrow 1.8s cubic-bezier(0.4,0,0.2,1) forwards' : 'none',
        }} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 7, opacity: showTag ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%', background: '#fff000',
            animation: showTag ? `dotBounce 1.2s ease ${i * 0.18}s infinite` : 'none',
          }} />
        ))}
      </div>
    </div>
  );
}
