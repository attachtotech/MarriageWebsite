import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {animateParallax} from '../../animations/scrollAnimations';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {EditorialImage} from '../Ornaments/EditorialImage';
import {CornerFlourish, LotusMedallion, OrnamentalDivider} from '../Ornaments/IndianOrnaments';
import {WeddingLogo} from '../Ornaments/WeddingLogo';
import {RSVPForm} from '../RSVPForm/RSVPForm';

export const FinalInvitation: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const rsvpWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([plaqueRef.current, rsvpWrapRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      mm.add('(min-width: 768px)', () => {
        animateParallax(bgRef.current, sectionRef.current, reducedMotion, 9);
      });

      if (plaqueRef.current) {
        gsap.fromTo(
          plaqueRef.current,
          {scale: 0.92, clipPath: 'inset(6% 6% 6% 6%)', opacity: 0.25},
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: plaqueRef.current,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 0.7,
            },
          },
        );
      }

      if (rsvpWrapRef.current) {
        gsap.fromTo(
          rsvpWrapRef.current,
          {y: 36, rotateX: 8, opacity: 0, transformPerspective: 1000},
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rsvpWrapRef.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative bg-[#30121D] text-[#F4E9D5] py-14 sm:py-20 md:py-24 px-5 sm:px-8 overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <EditorialImage
          src={weddingConfig.closingImage}
          alt="Candlelit palace terrace overlooking Lake Pichola"
          loading="lazy"
          className="w-full h-full object-cover"
          fallbackTitle={weddingConfig.brandName}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#30121D]/82 via-[#421724]/72 to-[#1F1016]/94"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-2xl md:max-w-3xl mx-auto">
        <div
          ref={plaqueRef}
          className="relative bg-[#30121D]/82 border border-[#C6A36A]/65 px-5 sm:px-9 md:px-12 py-7 sm:py-10 md:py-12 text-center mb-8 md:mb-10"
        >
          <CornerFlourish
            position="tl"
            className="pointer-events-none absolute top-1.5 left-1.5 w-7 h-7 md:w-9 md:h-9 text-[#D9BD8B]/75"
          />
          <CornerFlourish
            position="tr"
            className="pointer-events-none absolute top-1.5 right-1.5 w-7 h-7 md:w-9 md:h-9 text-[#D9BD8B]/75"
          />
          <CornerFlourish
            position="bl"
            className="pointer-events-none absolute bottom-1.5 left-1.5 w-7 h-7 md:w-9 md:h-9 text-[#D9BD8B]/75"
          />
          <CornerFlourish
            position="br"
            className="pointer-events-none absolute bottom-1.5 right-1.5 w-7 h-7 md:w-9 md:h-9 text-[#D9BD8B]/75"
          />

          <LotusMedallion className="w-8 h-8 md:w-10 md:h-10 mx-auto text-[#D9BD8B] mb-2.5 md:mb-3.5" />

          <h2 className="font-display italic type-section font-normal text-[#F7F0E5] text-balance leading-snug">
            “{weddingConfig.closingHeadline}”
          </h2>

          <OrnamentalDivider className="my-4 md:my-5" variant="gold" />

          <div aria-label={`${weddingConfig.brideName} & ${weddingConfig.groomName}`}>
            <WeddingLogo variant="champagne" size="lg" />
          </div>
          <p className="mt-1.5 md:mt-2 font-ui text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#F4E9D5]/80">
            {weddingConfig.displayDate} · {weddingConfig.venueName}
          </p>
        </div>

        {weddingConfig.rsvpEnabled && (
          <div ref={rsvpWrapRef}>
            <RSVPForm />
          </div>
        )}
      </div>
    </section>
  );
};
