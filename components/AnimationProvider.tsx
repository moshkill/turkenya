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
    let cleanupScroll: (() => void) | null = null;

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

      // --- parallax on hero/section images ---
      if (!reduceMotion) {
        const CAP = 60; // px — never travel further than the image overhang
        // rAF poll loop instead of a scroll listener: some pages don't reliably
        // emit window 'scroll' events. We also RE-QUERY the images each painted
        // frame — React can swap the SSR image nodes during hydration, which
        // would leave a once-captured NodeList pointing at detached elements.
        let lastY = -99999;
        let rafId = 0;
        const tick = () => {
          const y = window.scrollY || window.pageYOffset || 0;
          if (Math.abs(y - lastY) > 0.5) {
            lastY = y;
            document.querySelectorAll<HTMLElement>('[data-parallax], .parallax-img').forEach(el => {
              const speed = parseFloat(el.dataset?.parallax || '0.14');
              const rect = el.getBoundingClientRect();
              const center = rect.top + rect.height / 2 - window.innerHeight / 2;
              const off = Math.max(-CAP, Math.min(CAP, center * speed));
              // scale 1.28 gives ~14% overhang on every side so the clamped
              // travel (±60px) can never reveal the background edge.
              el.style.transform = `scale(1.28) translateY(${off}px)`;
            });
          }
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        cleanupScroll = () => cancelAnimationFrame(rafId);
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      revealObserver?.disconnect();
      autoObserver?.disconnect();
      cleanupScroll?.();
    };
  }, [pathname]);

  return null;
}
