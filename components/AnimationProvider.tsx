'use client';
import { useEffect } from 'react';

export default function AnimationProvider() {
  useEffect(() => {
    // --- Scroll reveal for sections ---
    const revealEls = document.querySelectorAll('.reveal-child');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(el => revealObserver.observe(el));

    // --- Auto fade-up for section headings and cards ---
    const style = document.createElement('style');
    style.textContent = `
      .auto-reveal {
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
      }
      .auto-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Target h2, service cards, testimonial cards, why cards
    const targets: NodeListOf<HTMLElement> = document.querySelectorAll(
      'h2, h3, .card-item, [data-reveal]'
    );

    const autoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay || String(i * 60);
            setTimeout(() => el.classList.add('visible'), parseInt(delay));
            autoObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => {
      el.classList.add('auto-reveal');
      autoObserver.observe(el);
    });

    // --- Parallax on images and section backgrounds ---
    const parallaxEls: NodeListOf<HTMLElement> = document.querySelectorAll('[data-parallax], .parallax-img');

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset?.parallax || '0.15');
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          const offset = center * speed;
          el.style.transform = `scale(1.05) translateY(${offset}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      revealObserver.disconnect();
      autoObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
