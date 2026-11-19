import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {animateClipReveal, animateDrawPaths} from '../../animations/scrollAnimations';
import {weddingEvents} from '../../data/events';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {EditorialImage} from '../Ornaments/EditorialImage';
import {
  CornerFlourish,
  EventMotifIllustration,
  OrnamentalDivider,
} from '../Ornaments/IndianOrnaments';

export const Ceremonies: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const featuredCeremonies = weddingEvents.filter((ev) => ev.featuredInCeremonies);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            headingRef.current,
            '[data-ceremony-block]',
            '[data-ceremony-img]',
            '[data-ceremony-copy]',
          ],
          {opacity: 1, y: 0, x: 0, rotateX: 0, clipPath: 'inset(0% 0% 0% 0%)'},
        );
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

      const blocks = sectionRef.current?.querySelectorAll<HTMLElement>('[data-ceremony-block]');
      blocks?.forEach((block, index) => {
        const imgFrame = block.querySelector<HTMLElement>('[data-ceremony-img]');
        const imgInner = block.querySelector<HTMLElement>('[data-ceremony-photo]');
        const copy = block.querySelector<HTMLElement>('[data-ceremony-copy]');
        const fromLeft = index % 2 === 0;

        gsap.fromTo(
          block,
          {y: 28, rotateX: 6, opacity: 0, transformPerspective: 1100},
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        if (imgFrame) {
          animateClipReveal(imgFrame, reducedMotion, {
            fromClip: fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)',
            duration: 1.05,
            start: 'top 84%',
          });
        }

        if (imgInner) {
          gsap.fromTo(
            imgInner,
            {yPercent: -6, scale: 1.1},
            {
              yPercent: 6,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }

        if (copy) {
          gsap.fromTo(
            copy.children,
            {y: 16, opacity: 0},
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      });

      animateDrawPaths(sectionRef.current, reducedMotion, 'top 82%');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="ceremonies"
      ref={sectionRef}
      className="relative bg-[#30121D] text-[#F4E9D5] py-14 sm:py-20 md:py-24 px-5 sm:px-8 paper-grain overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-8 border border-[#C6A36A]/25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center max-w-lg md:max-w-xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <h2 className="font-display type-section font-medium text-[#F7F0E5]">
            The Ceremonies
          </h2>
          <OrnamentalDivider className="my-3.5" variant="gold" />
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {featuredCeremonies.map((ceremony, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={ceremony.id}
                data-ceremony-block
                className="relative bg-[#421724]/85 border border-[#C6A36A]/45 p-4 sm:p-7 md:p-9"
              >
                <CornerFlourish
                  position="tl"
                  className="pointer-events-none absolute top-1.5 left-1.5 w-6 h-6 md:w-8 md:h-8 text-[#D9BD8B]/60"
                />
                <CornerFlourish
                  position="br"
                  className="pointer-events-none absolute bottom-1.5 right-1.5 w-6 h-6 md:w-8 md:h-8 text-[#D9BD8B]/60"
                />

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                    reverse ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="lg:col-span-6">
                    <div
                      data-ceremony-img
                      className="relative overflow-hidden border border-[#D9BD8B]/50 aspect-[4/3] bg-[#1F1016]"
                    >
                      <div data-ceremony-photo className="w-full h-full will-change-transform">
                        <EditorialImage
                          src={ceremony.image || '/src/assets/images/hero_palace_mandap_1795071653785.jpg'}
                          alt={`${ceremony.name} — ${ceremony.subtitle}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          fallbackTitle={ceremony.name}
                        />
                      </div>
                    </div>
                  </div>

                  <div data-ceremony-copy className="lg:col-span-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 md:gap-3 text-[#D9BD8B] mb-1.5 md:mb-2">
                      <EventMotifIllustration motif={ceremony.motif} className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                      <span className="font-ui text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#D9BD8B]">
                        {ceremony.dayLabel}
                      </span>
                    </div>

                    <h3 className="font-display type-section font-medium text-[#F7F0E5]">
                      {ceremony.name}
                    </h3>
                    <p className="font-body italic text-sm sm:text-base md:text-lg text-[#D9BD8B] mt-0.5 mb-3 md:mb-4">
                      {ceremony.subtitle}
                    </p>

                    <p className="font-body type-body text-[#F4E9D5]/90 mb-4 md:mb-5">
                      {ceremony.description}
                    </p>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3.5 pt-3.5 md:pt-4 border-t border-[#C6A36A]/30 text-sm md:text-base">
                      <div>
                        <dt className="font-ui text-[10px] md:text-xs tracking-[0.18em] uppercase text-[#D9BD8B]/80">
                          Date &amp; Time
                        </dt>
                        <dd className="mt-0.5 font-body type-body text-[#F7F0E5]">
                          {ceremony.date} · {ceremony.time}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-ui text-[10px] md:text-xs tracking-[0.18em] uppercase text-[#D9BD8B]/80">
                          Venue
                        </dt>
                        <dd className="mt-0.5 font-body type-body text-[#F7F0E5]">
                          {ceremony.venue}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="font-ui text-[10px] md:text-xs tracking-[0.18em] uppercase text-[#D9BD8B]/80">
                          Attire
                        </dt>
                        <dd className="mt-0.5 font-body italic type-body text-[#F4E9D5]/85">
                          {ceremony.attire}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
