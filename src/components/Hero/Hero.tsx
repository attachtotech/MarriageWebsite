import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {EditorialImage} from '../Ornaments/EditorialImage';
import {CornerFlourish, OrnamentalDivider} from '../Ornaments/IndianOrnaments';
import {WeddingLogo} from '../Ornaments/WeddingLogo';

interface HeroProps {
  readyToAnimate: boolean;
}

export const Hero: React.FC<HeroProps> = ({readyToAnimate}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerFrameRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-hero-reveal], [data-hero-logo], [data-hero-kicker]', {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      if (!readyToAnimate) {
        gsap.set('[data-hero-kicker], [data-hero-reveal]', {opacity: 0, y: 14});
        gsap.set('[data-hero-logo]', {opacity: 0, scale: 0.94});
        return;
      }

      const tl = gsap.timeline({defaults: {ease: 'power3.out', force3D: true}});

      tl.fromTo(bgRef.current, {scale: 1.07}, {scale: 1.0, duration: 1.6, ease: 'power2.out'})
        .fromTo(
          '[data-hero-kicker]',
          {y: 14, opacity: 0},
          {y: 0, opacity: 1, duration: 0.8},
          0.12,
        )
        .fromTo(
          '[data-hero-logo]',
          {scale: 0.93, opacity: 0},
          {scale: 1, opacity: 1, duration: 1.05, ease: 'power3.out'},
          0.22,
        )
        .fromTo(
          '[data-hero-reveal]',
          {y: 14, opacity: 0},
          {y: 0, opacity: 1, duration: 0.8, stagger: 0.1},
          0.48,
        );

      gsap.to(indicatorRef.current, {
        y: 5,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      mm.add('(min-width: 768px)', () => {
        gsap.to(bgRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Multi-plane scroll exit across all viewports
      gsap.to(contentRef.current, {
        y: -44,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(innerFrameRef.current, {
        scale: 0.96,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [readyToAnimate, reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#30121D] text-[#F4E9D5]"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <EditorialImage
          src={weddingConfig.heroImage}
          alt={`${weddingConfig.brideName} and ${weddingConfig.groomName} royal wedding couple portrait`}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-[50%_28%]"
          fallbackTitle={weddingConfig.brandName}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1B070E]/75 via-[#30121D]/42 to-[#19070D]/92"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 58% at 50% 50%, rgba(36, 10, 20, 0.72) 0%, rgba(48, 18, 29, 0.36) 62%, rgba(22, 6, 12, 0.78) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div
        ref={innerFrameRef}
        className="pointer-events-none absolute inset-4 sm:inset-7 lg:inset-10 border border-[#E2C287]/55 will-change-transform"
        aria-hidden="true"
      >
        <CornerFlourish position="tl" className="absolute -top-1 -left-1 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#E6C78E]/95 drop-shadow-[0_2px_8px_rgba(20,6,11,0.85)]" />
        <CornerFlourish position="tr" className="absolute -top-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#E6C78E]/95 drop-shadow-[0_2px_8px_rgba(20,6,11,0.85)]" />
        <CornerFlourish position="bl" className="absolute -bottom-1 -left-1 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#E6C78E]/95 drop-shadow-[0_2px_8px_rgba(20,6,11,0.85)]" />
        <CornerFlourish position="br" className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#E6C78E]/95 drop-shadow-[0_2px_8px_rgba(20,6,11,0.85)]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl md:max-w-3xl mx-auto px-6 sm:px-8 py-20 md:py-24 text-center flex flex-col items-center will-change-transform"
      >
        <p
          data-hero-kicker
          className="font-body italic type-subheading text-[#FFF6E8] tracking-wide mb-2.5 md:mb-3.5 drop-shadow-[0_2px_12px_rgba(18,5,10,0.95)]"
        >
          {weddingConfig.introduction}
        </p>

        <h1
          data-hero-logo
          aria-label={`${weddingConfig.brideName} & ${weddingConfig.groomName}`}
          className="py-1 drop-shadow-[0_4px_18px_rgba(18,5,10,0.92)]"
        >
          <WeddingLogo variant="light" size="xl" />
        </h1>

        <div data-hero-reveal className="w-full max-w-[200px] md:max-w-[260px] my-4 md:my-5 drop-shadow-[0_2px_10px_rgba(18,5,10,0.9)]">
          <OrnamentalDivider variant="gold" />
        </div>

        <p
          data-hero-reveal
          className="font-body type-subheading text-[#FFF6E8] max-w-md md:max-w-xl text-balance drop-shadow-[0_2px_14px_rgba(18,5,10,0.95)]"
        >
          {weddingConfig.heroMessage}
        </p>

        <p
          data-hero-reveal
          className="mt-4 md:mt-5 font-ui type-label uppercase text-[#F0D39A] drop-shadow-[0_2px_12px_rgba(18,5,10,0.95)]"
        >
          {weddingConfig.displayDate} · {weddingConfig.weddingLocation}
        </p>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="font-ui text-[10px] md:text-xs tracking-[0.24em] uppercase text-[#F0D39A] drop-shadow-[0_2px_8px_rgba(18,5,10,0.95)]">
          Scroll
        </span>
        <span className="w-px h-5 md:h-7 bg-gradient-to-b from-[#F0D39A] to-transparent" />
      </div>
    </section>
  );
};
