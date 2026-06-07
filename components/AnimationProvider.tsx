'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Drives scroll-reveal + parallax across EVERY page. Lives in the root layout,
// so it must re-scan the DOM on each route change — otherwise reveal/parallax
// only work on the first load and break on client-side navigation.
export default function AnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Inject the reveal stylesheet once.
    if (!document.getElementById('auto-reveal-style')) {
      const style = document.createElement('style');
      style.id = 'auto-reveal-style';
      style.textContent = `
        .auto-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); will-change: opacity, transform; }
        .auto-reveal.visible { opacity: 1; transform: translateY(0); }
      `;
      document.head.appendChild(style);
    }

    // Wait a frame so the new route's DOM is painted before we scan it.
    let revealObserver: IntersectionObserver | null = null;
    let autoObserver: IntersectionObserver | null = null;

    // --- parallax: independent continuous rAF loop ---
    // Runs on its own (not nested in the reveal-setup frame), re-queries every
    // frame (React swaps SSR nodes on hydration), and reapplies every frame so
    // a React re-render can't leave the transform wiped. Cheap (a handful of imgs).
    let rafP = 0;
    if (!reduceMotion) {
      const CAP = 60; // px — clamp so travel never exceeds the image overhang
      const loop = () => {
        document.querySelectorAll<HTMLElement>('[data-parallax], .parallax-img').forEach(el => {
          const speed = parseFloat(el.dataset?.parallax || '0.14');
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          const off = Math.max(-CAP, Math.min(CAP, center * speed));
          el.style.transform = `scale(1.28) translateY(${off}px)`;
        });
        rafP = requestAnimationFrame(loop);
      };
      rafP = requestAnimationFrame(loop);
    }

    const raf = requestAnimationFrame(() => {
      // --- reveal-child staggered grids ---
      revealObserver = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver!.unobserve(e.target); }
        }),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal-child:not(.in-view)').forEach(el => revealObserver!.observe(el));

      // --- auto fade-up for headings, cards, and opted-in blocks ---
      // Tag any fresh targets, then observe EVERYTHING still pending (including
      // elements left tagged-but-unrevealed by a previous route — e.g. the
      // footer when you navigate away before scrolling to it). Without the
      // re-observe, those stay invisible forever.
      document.querySelectorAll<HTMLElement>(
        'h2:not(.auto-reveal), h3:not(.auto-reveal), .card-item:not(.auto-reveal), [data-reveal]:not(.auto-reveal)'
      ).forEach(el => el.classList.add('auto-reveal'));

      const pending = document.querySelectorAll<HTMLElement>('.auto-reveal:not(.visible)');

      if (reduceMotion) {
        pending.forEach(el => el.classList.add('visible'));
      } else {
        autoObserver = new IntersectionObserver(
          (entries) => entries.forEach((e, i) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const delay = el.dataset.delay || String(Math.min(i * 60, 300));
              setTimeout(() => el.classList.add('visible'), parseInt(delay));
              autoObserver!.unobserve(el);
            }
          }),
          { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
        );
        pending.forEach(el => autoObserver!.observe(el));
      }

    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafP);
      revealObserver?.disconnect();
      autoObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
