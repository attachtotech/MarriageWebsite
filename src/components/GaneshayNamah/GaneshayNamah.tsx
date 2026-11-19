import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {LotusMedallion} from '../Ornaments/IndianOrnaments';

export const GaneshayNamah: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textClipRef = useRef<HTMLDivElement>(null);
  const leftOrnamentRef = useRef<HTMLDivElement>(null);
  const rightOrnamentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(textClipRef.current, {clipPath: 'inset(0% 0% 0% 0%)', x: 0, opacity: 1});
        gsap.set([leftOrnamentRef.current, rightOrnamentRef.current, dividerRef.current], {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1,
          scaleX: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          end: 'center 48%',
          scrub: 0.7,
        },
      });

      tl.fromTo(
        textClipRef.current,
        {clipPath: 'inset(0% 100% 0% 0%)', x: -20, opacity: 0.35},
        {clipPath: 'inset(0% 0% 0% 0%)', x: 0, opacity: 1, ease: 'power2.out'},
        0,
      )
        .fromTo(
          leftOrnamentRef.current,
          {x: -28, rotation: -45, scale: 0.72, opacity: 0},
          {x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power2.out'},
          0.05,
        )
        .fromTo(
          rightOrnamentRef.current,
          {x: 28, rotation: 45, scale: 0.72, opacity: 0},
          {x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power2.out'},
          0.05,
        )
        .fromTo(
          dividerRef.current,
          {scaleX: 0, opacity: 0},
          {scaleX: 1, opacity: 1, ease: 'power2.out'},
          0.18,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="ganeshay-namah"
      ref={sectionRef}
      aria-label="Sacred Invocation"
      className="relative bg-[#F8F5EC] text-[#352720] py-10 sm:py-14 md:py-16 lg:py-20 px-5 sm:px-8 overflow-hidden paper-grain"
    >
      <div className="relative z-10 max-w-3xl md:max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 w-full">
          <div ref={leftOrnamentRef} className="text-[#C59A52] shrink-0">
            <LotusMedallion className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
          </div>

          <div ref={textClipRef} className="overflow-hidden py-1">
            <p
              lang="sa"
              style={{fontFamily: 'var(--font-devanagari)'}}
              className="text-xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-normal tracking-[0.06em] text-[#9A712B] leading-snug"
            >
              {weddingConfig.ganeshayNamahDevanagari}
            </p>
          </div>

          <div ref={rightOrnamentRef} className="text-[#C59A52] shrink-0">
            <LotusMedallion className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
          </div>
        </div>

        <div
          ref={dividerRef}
          className="mt-3.5 md:mt-5 flex items-center justify-center gap-2.5 w-full max-w-[220px] md:max-w-[280px] origin-center"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-[#C59A52]/55" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C59A52]" />
          <span className="h-px flex-1 bg-[#C59A52]/55" />
        </div>
      </div>
    </section>
  );
};
