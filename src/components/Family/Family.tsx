import React, {useEffect, useRef} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {animateDrawPaths} from '../../animations/scrollAnimations';
import {FamilyProfile, weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {JharokhaArchTop, LotusMedallion, OrnamentalDivider} from '../Ornaments/IndianOrnaments';

const FamilyFrame: React.FC<{profile: FamilyProfile; side: 'left' | 'right'}> = ({
  profile,
  side,
}) => (
  <article
    data-family-frame={side}
    className="relative bg-[#F2EBDD]/70 border border-[#C59A52]/70 px-5 sm:px-8 pt-5 pb-7 text-center flex flex-col items-center shadow-sm"
  >
    <div className="pointer-events-none absolute inset-2 border border-[#651E2B]/20" aria-hidden="true" />

    <div className="relative z-10 w-full max-w-[180px] text-[#C59A52] mb-2">
      <JharokhaArchTop className="w-full h-7" />
    </div>

    <p className="relative z-10 font-ui text-[10px] tracking-[0.22em] uppercase text-[#651E2B]">
      {profile.title}
    </p>
    <h3 className="relative z-10 mt-1 font-display type-subheading font-medium text-[#651E2B]">
      {profile.familySurname}
    </h3>
    <p className="relative z-10 mt-0.5 font-body italic text-sm text-[#C59A52]">
      {profile.city}
    </p>

    <OrnamentalDivider className="w-full my-3.5" variant="gold" />

    <div className="relative z-10 space-y-3 w-full max-w-sm">
      {profile.groups.map((group) => (
        <div key={group.heading}>
          <p className="font-ui text-[10px] tracking-[0.18em] uppercase text-[#352720]/65">
            {group.heading}
          </p>
          <div className="mt-0.5 space-y-0.5">
            {group.names.map((person) => (
              <p key={person} className="font-body type-body text-[#352720]">
                {person}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>

    <LotusMedallion className="relative z-10 w-6 h-6 text-[#C59A52] my-3.5" />

    <p className="relative z-10 font-body italic text-sm text-[#352720]/80 max-w-xs leading-relaxed">
      “{profile.blessingQuote}”
    </p>
  </article>
);

export const Family: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(['[data-family-frame]', headingRef.current], {
          opacity: 1,
          y: 0,
          x: 0,
          rotateY: 0,
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

      const leftFrame = sectionRef.current?.querySelector<HTMLElement>('[data-family-frame="left"]');
      const rightFrame = sectionRef.current?.querySelector<HTMLElement>('[data-family-frame="right"]');

      if (leftFrame) {
        gsap.fromTo(
          leftFrame,
          {x: -34, rotateY: 12, opacity: 0, transformPerspective: 1200},
          {
            x: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftFrame,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (rightFrame) {
        gsap.fromTo(
          rightFrame,
          {x: 34, rotateY: -12, opacity: 0, transformPerspective: 1200},
          {
            x: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightFrame,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      animateDrawPaths(sectionRef.current, reducedMotion, 'top 80%');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="family"
      ref={sectionRef}
      className="relative bg-[#F8F5EC] text-[#352720] py-14 sm:py-20 px-5 sm:px-8 paper-grain overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center max-w-lg mx-auto mb-9 sm:mb-12">
          <h2 className="font-display type-section font-medium text-[#651E2B]">
            Our Families
          </h2>
          <OrnamentalDivider className="my-3.5" variant="gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <FamilyFrame profile={weddingConfig.brideFamily} side="left" />
          <FamilyFrame profile={weddingConfig.groomFamily} side="right" />
        </div>
      </div>
    </section>
  );
};
