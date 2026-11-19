import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {animateDrawPaths} from '../../animations/scrollAnimations';
import {weddingEvents} from '../../data/events';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {EventMotifIllustration, OrnamentalDivider} from '../Ornaments/IndianOrnaments';

export const WeddingTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<SVGLineElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-timeline-item], [data-timeline-node], [data-timeline-heading]', {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateY: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {y: 20, opacity: 0, clipPath: 'inset(0% 0% 45% 0%)'},
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (spineRef.current) {
        const length = spineRef.current.getTotalLength();
        gsap.set(spineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(spineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-timeline-track]',
            start: 'top 74%',
            end: 'bottom 70%',
            scrub: 0.65,
          },
        });
      }

      const items = sectionRef.current?.querySelectorAll<HTMLElement>('[data-timeline-item]');
      items?.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const desktop = window.innerWidth >= 768;
        const node = item.querySelector<HTMLElement>('[data-timeline-node]');

        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 26,
            x: desktop ? (isEven ? -32 : 32) : 16,
            rotateY: desktop ? (isEven ? 14 : -14) : 0,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateY: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        if (node) {
          gsap.fromTo(
            node,
            {scale: 0, rotation: -45},
            {
              scale: 1,
              rotation: 45,
              duration: 0.55,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      });

      animateDrawPaths(sectionRef.current, reducedMotion, 'top 85%');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative bg-[#F8F5EC] text-[#352720] py-14 sm:py-20 px-5 sm:px-8 paper-grain stationery-motif"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <div ref={headingRef} data-timeline-heading className="text-center max-w-lg mx-auto mb-10 sm:mb-14">
          <h2 className="font-display type-section font-medium text-[#651E2B]">
            Wedding Events
          </h2>
          <OrnamentalDivider className="my-3.5" variant="gold" />
        </div>

        <div data-timeline-track className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none"
            aria-hidden="true"
          >
            <svg className="w-4 h-full -ml-2 overflow-visible" preserveAspectRatio="none">
              <line
                ref={spineRef}
                x1="8"
                y1="0"
                x2="8"
                y2="100%"
                stroke="#C59A52"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          <div
            className="md:hidden absolute left-4 top-2 bottom-2 w-px bg-[#C59A52]/45 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-11">
            {weddingEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <article
                  key={event.id}
                  data-timeline-item
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] pl-10 md:pl-0 ${
                      isLeft ? 'md:text-right md:pr-3' : 'md:text-left md:pl-3'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2.5 mb-1 text-[#C59A52] ${
                        isLeft ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <EventMotifIllustration motif={event.motif} className="w-8 h-8 text-[#651E2B]" />
                      <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-[#651E2B]/80">
                        {event.dayLabel}
                      </span>
                    </div>

                    <h3 className="font-display type-subheading font-medium text-[#651E2B]">
                      {event.name}
                    </h3>

                    <p
                      className={`mt-0.5 font-ui text-[11px] tracking-[0.12em] uppercase text-[#352720]/70 ${
                        isLeft ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      {event.date} · {event.time}
                    </p>

                    <p className="mt-1.5 font-body type-body text-[#352720]/85">
                      {event.description}
                    </p>

                    <p className="mt-1 font-body italic text-xs sm:text-sm text-[#651E2B]/85">
                      {event.venue}
                    </p>
                  </div>

                  <div
                    className="absolute left-4 md:left-1/2 top-2.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span
                      data-timeline-node
                      className="w-2.5 h-2.5 rotate-45 bg-[#F8F5EC] border-[1.5px] border-[#651E2B] flex items-center justify-center"
                    >
                      <span className="w-1 h-1 bg-[#C59A52]" />
                    </span>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-2rem)]" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
