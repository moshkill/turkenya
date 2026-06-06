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
      const targets = document.querySelectorAll<HTMLElement>(
        'h2:not(.auto-reveal), h3:not(.auto-reveal), .card-item:not(.auto-reveal), [data-reveal]:not(.auto-reveal)'
      );

      if (reduceMotion) {
        // Honour reduced-motion: reveal everything immediately, no transitions.
        targets.forEach(el => el.classList.add('auto-reveal', 'visible'));
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
        targets.forEach(el => { el.classList.add('auto-reveal'); autoObserver!.observe(el); });
      }

      // --- parallax on hero/section images ---
      if (!reduceMotion) {
        const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax], .parallax-img');
        let ticking = false;
        const onScroll = () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            parallaxEls.forEach(el => {
              const speed = parseFloat(el.dataset?.parallax || '0.12');
              const rect = el.getBoundingClientRect();
              const center = rect.top + rect.height / 2 - window.innerHeight / 2;
              el.style.transform = `scale(1.08) translateY(${center * speed}px)`;
            });
            ticking = false;
          });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        cleanupScroll = () => window.removeEventListener('scroll', onScroll);
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
