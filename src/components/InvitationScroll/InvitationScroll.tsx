import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {animateDrawPaths} from '../../animations/scrollAnimations';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {LotusMedallion, ScrollFinial} from '../Ornaments/IndianOrnaments';

export const InvitationScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const leftFinialRef = useRef<HTMLDivElement>(null);
  const rightFinialRef = useRef<HTMLDivElement>(null);
  const centerCrestRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(ribbonRef.current, {clipPath: 'inset(0% 0% 0% 0%)', scale: 1});
        gsap.set([leftFinialRef.current, rightFinialRef.current], {x: 0, rotationY: 0});
        gsap.set([centerCrestRef.current, copyRef.current], {opacity: 1, y: 0, scale: 1});
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          end: 'center 48%',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        ribbonRef.current,
        {clipPath: 'inset(0% 48% 0% 48%)', scale: 0.96},
        {clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none'},
        0,
      )
        .fromTo(
          leftFinialRef.current,
          {x: 64, rotation: -10},
          {x: 0, rotation: 0, ease: 'none'},
          0,
        )
        .fromTo(
          rightFinialRef.current,
          {x: -64, rotation: 10},
          {x: 0, rotation: 0, ease: 'none'},
          0,
        )
        .fromTo(
          centerCrestRef.current,
          {scale: 0.68, rotation: -20, opacity: 0},
          {scale: 1, rotation: 0, opacity: 1, ease: 'power2.out'},
          0.16,
        )
        .fromTo(
          copyRef.current,
          {y: 16, opacity: 0},
          {y: 0, opacity: 1, ease: 'power2.out'},
          0.28,
        );

      animateDrawPaths(sectionRef.current, reducedMotion, 'top 78%');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="invitation-scroll"
      ref={sectionRef}
      className="relative bg-[#F2EBDD] text-[#352720] py-12 sm:py-18 px-5 sm:px-8 overflow-hidden paper-grain"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="relative flex items-center justify-center">
          <div ref={leftFinialRef} className="relative z-20 shrink-0 -mr-2 sm:-mr-2.5">
            <ScrollFinial side="left" className="w-6 h-32 sm:w-9 sm:h-44 drop-shadow-sm" />
          </div>

          <div
            ref={ribbonRef}
            className="relative flex-1 bg-gradient-to-b from-[#30121D] via-[#421724] to-[#30121D] text-[#F4E9D5] border-y-2 border-[#C6A36A] px-5 sm:px-10 py-7 sm:py-10 shadow-md overflow-hidden paper-grain"
          >
            <div
              className="pointer-events-none absolute inset-x-2 inset-y-1.5 border-y border-[#D9BD8B]/40"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div ref={centerCrestRef} className="text-[#D9BD8B] mb-2.5">
                <LotusMedallion className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>

              <div ref={copyRef} className="max-w-lg mx-auto">
                <p className="font-ui text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#D9BD8B] mb-1.5">
                  {weddingConfig.invitationTitle}
                </p>
                <h2 className="font-display italic type-section font-normal text-[#F7F0E5] leading-snug text-balance">
                  “{weddingConfig.sanskritTranslation}”
                </h2>
                <p className="mt-3 font-body type-body tracking-wide text-[#D9BD8B]/90">
                  {weddingConfig.brideName} &amp; {weddingConfig.groomName} · {weddingConfig.displayDate}
                </p>
              </div>
            </div>
          </div>

          <div ref={rightFinialRef} className="relative z-20 shrink-0 -ml-2 sm:-ml-2.5">
            <ScrollFinial side="right" className="w-6 h-32 sm:w-9 sm:h-44 drop-shadow-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};
