import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {animateDrawPaths} from '../../animations/scrollAnimations';
import {thingsToKnowItems} from '../../data/thingsToKnow';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {CornerFlourish, LotusMedallion, OrnamentalDivider} from '../Ornaments/IndianOrnaments';

export const ThingsToKnow: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const topRodRef = useRef<HTMLDivElement>(null);
  const bottomRodRef = useRef<HTMLDivElement>(null);
  const scrollSheetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            headingRef.current,
            topRodRef.current,
            bottomRodRef.current,
            scrollSheetRef.current,
            '[data-guide-item]',
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
          },
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSheetRef.current,
          start: 'top 86%',
          end: 'top 42%',
          scrub: 0.75,
        },
      });

      tl.fromTo(
        topRodRef.current,
        {y: 34},
        {y: 0, ease: 'none'},
        0,
      )
        .fromTo(
          bottomRodRef.current,
          {y: -34},
          {y: 0, ease: 'none'},
          0,
        )
        .fromTo(
          scrollSheetRef.current,
          {clipPath: 'inset(16% 0% 16% 0%)', opacity: 0.55},
          {clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, ease: 'none'},
          0,
        );

      const guideItems = sectionRef.current?.querySelectorAll<HTMLElement>('[data-guide-item]');
      guideItems?.forEach((item, idx) => {
        const fromLeft = idx % 2 === 0;
        gsap.fromTo(
          item,
          {x: fromLeft ? -16 : 16, y: 12, opacity: 0},
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      animateDrawPaths(sectionRef.current, reducedMotion, 'top 82%');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="things-to-know"
      ref={sectionRef}
      className="relative bg-[#F2EBDD] text-[#352720] py-14 sm:py-20 md:py-24 px-5 sm:px-8 paper-grain"
    >
      <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-display type-section font-medium text-[#651E2B]">
            Things to Know
          </h2>
          <OrnamentalDivider className="my-3.5" variant="gold" />
        </div>

        <div className="relative">
          <div
            ref={topRodRef}
            className="relative z-20 h-2.5 md:h-3 mx-2 sm:mx-5 bg-[#421724] border border-[#C6A36A] shadow-sm will-change-transform"
            aria-hidden="true"
          />

          <div
            ref={scrollSheetRef}
            className="relative bg-[#F8F5EC] border-x border-[#C59A52]/75 px-5 sm:px-9 md:px-12 py-7 sm:py-10 md:py-12 shadow-md"
          >
            <CornerFlourish
              position="tl"
              className="pointer-events-none absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 text-[#C59A52]/65"
            />
            <CornerFlourish
              position="tr"
              className="pointer-events-none absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 text-[#C59A52]/65"
            />
            <CornerFlourish
              position="bl"
              className="pointer-events-none absolute bottom-2 left-2 w-6 h-6 md:w-8 md:h-8 text-[#C59A52]/65"
            />
            <CornerFlourish
              position="br"
              className="pointer-events-none absolute bottom-2 right-2 w-6 h-6 md:w-8 md:h-8 text-[#C59A52]/65"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5 md:gap-y-7">
              {thingsToKnowItems.map((item) => (
                <div
                  key={item.id}
                  data-guide-item
                  className="pb-4 md:pb-5 border-b border-[#C59A52]/30"
                >
                  <h3 className="font-display type-subheading font-medium text-[#651E2B]">
                    {item.title}
                  </h3>
                  <p className="mt-1 md:mt-1.5 font-body type-body text-[#352720]/85">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 flex justify-center text-[#C59A52]">
              <LotusMedallion className="w-7 h-7 md:w-9 md:h-9" />
            </div>
          </div>

          <div
            ref={bottomRodRef}
            className="relative z-20 h-2.5 md:h-3 mx-2 sm:mx-5 bg-[#421724] border border-[#C6A36A] shadow-sm will-change-transform"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};
