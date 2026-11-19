import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useCountdown} from '../../hooks/useCountdown';
import {useReducedMotion} from '../../hooks/useReducedMotion';

export const Countdown: React.FC = () => {
  const {days, hours, minutes, seconds, isPast} = useCountdown(weddingConfig.weddingDate);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion || isPast) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-countdown-unit]',
        {y: 12, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPast, reducedMotion]);

  if (isPast) {
    return (
      <div className="py-3 px-4 border-y border-[#C59A52]/40 text-center">
        <p className="font-display italic type-subheading text-[#651E2B]">
          Our sacred union has begun.
        </p>
      </div>
    );
  }

  const units = [
    {label: 'Days', value: days},
    {label: 'Hours', value: hours},
    {label: 'Min', value: minutes},
    {label: 'Sec', value: seconds},
  ];

  return (
    <div
      ref={containerRef}
      aria-label="Countdown to the wedding"
      className="grid grid-cols-4 gap-2 sm:gap-6 max-w-sm mx-auto py-3.5 border-y border-[#C59A52]/40"
    >
      {units.map((unit) => (
        <div key={unit.label} data-countdown-unit className="flex flex-col items-center">
          <span className="font-display text-xl sm:text-3xl font-medium text-[#651E2B] tabular-nums leading-none">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="mt-1.5 font-ui text-[10px] tracking-[0.18em] uppercase text-[#352720]/70">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
