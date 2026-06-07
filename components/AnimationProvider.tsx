'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Drives scroll-reveal + parallax across every page. Two independent effects so
// one can never break the other.
export default function AnimationProvider() {
  const pathname = usePathname();

  // ── Scroll-reveal — re-scan the DOM on each route change ──
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.getElementById('auto-reveal-style')) {
      const s = document.createElement('style');
      s.id = 'auto-reveal-style';
      s.textContent = '.auto-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);will-change:opacity,transform}.auto-reveal.visible{opacity:1;transform:translateY(0)}';
      document.head.appendChild(s);
    }

    let ro: IntersectionObserver | null = null;
    let ao: IntersectionObserver | null = null;

    const raf = requestAnimationFrame(() => {
      ro = new IntersectionObserver(
        es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro!.unobserve(e.target); } }),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal-child:not(.in-view)').forEach(el => ro!.observe(el));

      document.querySelectorAll<HTMLElement>('h2:not(.auto-reveal), h3:not(.auto-reveal), .card-item:not(.auto-reveal), [data-reveal]:not(.auto-reveal)').forEach(el => el.classList.add('auto-reveal'));
      const pending = document.querySelectorAll<HTMLElement>('.auto-reveal:not(.visible)');

      if (reduce) {
        pending.forEach(el => el.classList.add('visible'));
      } else {
        ao = new IntersectionObserver(
          es => es.forEach((e, i) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const d = el.dataset.delay || String(Math.min(i * 60, 300));
              setTimeout(() => el.classList.add('visible'), parseInt(d));
              ao!.unobserve(el);
            }
          }),
          { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
        );
        pending.forEach(el => ao!.observe(el));
      }
    });

    return () => { cancelAnimationFrame(raf); ro?.disconnect(); ao?.disconnect(); };
  }, [pathname]);

  // ── Parallax — one continuous loop for the app's lifetime ──
  // Re-queries every frame (hydration swaps SSR nodes; routes add new images)
  // and reapplies each frame so nothing can leave it stale. Clamped + scaled so
  // the travel never reveals a background edge.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const CAP = 60;
    let id = 0;
    const loop = () => {
      document.querySelectorAll<HTMLElement>('[data-parallax], .parallax-img').forEach(el => {
        const speed = parseFloat(el.dataset?.parallax || '0.14');
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2 - window.innerHeight / 2;
        const off = Math.max(-CAP, Math.min(CAP, c * speed));
        el.style.transform = `scale(1.28) translateY(${off}px)`;
      });
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
