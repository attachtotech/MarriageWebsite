import React, {useEffect, useRef} from 'react';
import {ExternalLink, MapPin} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {animateClipReveal, animateParallax} from '../../animations/scrollAnimations';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {EditorialImage} from '../Ornaments/EditorialImage';
import {OrnamentalDivider} from '../Ornaments/IndianOrnaments';

export const Venue: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([headingRef.current, frameRef.current, plaqueRef.current], {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {y: 22, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          {clipPath: 'inset(10% 18% 10% 18%)', opacity: 0.45},
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 88%',
              end: 'center 52%',
              scrub: 0.75,
            },
          },
        );
      }

      mm.add('(min-width: 768px)', () => {
        animateParallax(imageWrapRef.current, frameRef.current, reducedMotion, 10);
      });

      if (plaqueRef.current) {
        gsap.fromTo(
          plaqueRef.current,
          {y: 44, opacity: 0.2},
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: plaqueRef.current,
              start: 'top 92%',
              end: 'top 64%',
              scrub: 0.75,
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
      id="venue"
      ref={sectionRef}
      className="relative bg-[#F8F5EC] text-[#352720] py-14 sm:py-20 md:py-24 px-5 sm:px-8 paper-grain"
    >
      <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-display type-section font-medium text-[#651E2B]">
            {weddingConfig.venueName}
          </h2>
          <OrnamentalDivider className="my-3.5" variant="gold" />
          <p className="font-body italic type-body text-[#352720]/80">
            {weddingConfig.venueSubtitle} · {weddingConfig.weddingLocation}
          </p>
        </div>

        <div className="relative">
          <div
            ref={frameRef}
            className="relative overflow-hidden border border-[#C59A52]/70 bg-[#EAE0CF] aspect-[16/10] sm:aspect-[16/9]"
          >
            <div ref={imageWrapRef} className="w-full h-full will-change-transform">
              <EditorialImage
                src={weddingConfig.venueImage}
                alt={`${weddingConfig.venueName} in ${weddingConfig.weddingLocation}`}
                loading="lazy"
                className="w-full h-full object-cover"
                fallbackTitle={weddingConfig.venueName}
              />
            </div>
            <div
              className="pointer-events-none absolute inset-3 sm:inset-4 border border-[#F8F5EC]/40"
              aria-hidden="true"
            />
          </div>

          <div
            ref={plaqueRef}
            className="relative z-10 max-w-xl md:max-w-2xl mx-auto -mt-5 sm:-mt-10 md:-mt-12 bg-[#F8F5EC] border border-[#C59A52]/75 px-5 sm:px-8 md:px-10 py-6 sm:py-7 md:py-9 text-center shadow-md"
          >
            <div className="pointer-events-none absolute inset-1.5 border border-[#651E2B]/15" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#651E2B] mb-1.5 md:mb-2" aria-hidden="true" />
              <p className="font-body type-body text-[#352720]/90 max-w-md md:max-w-lg">
                {weddingConfig.venueAddress}
              </p>
              <p className="mt-1.5 md:mt-2 font-ui text-[10px] md:text-xs tracking-[0.18em] uppercase text-[#651E2B]/80">
                February 12 – 14, 2027 · Check-in 12:00 PM
              </p>

              <a
                href={weddingConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-5 min-h-[40px] md:min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2 md:px-7 md:py-2.5 bg-[#651E2B] hover:bg-[#43131F] text-[#F8F5EC] border border-[#C59A52]/70 font-ui text-[11px] md:text-xs tracking-[0.16em] uppercase transition-colors whitespace-nowrap"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D8B77C]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
