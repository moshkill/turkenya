'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitial = () => {
    switch (direction) {
      case 'left': return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      case 'fade': return 'none';
      default: return 'translateY(40px)';
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = getInitial();
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translate(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
