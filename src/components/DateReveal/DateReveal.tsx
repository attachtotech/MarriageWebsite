import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CalendarPlus, Download, RotateCcw} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {animateDrawPaths} from '../../animations/scrollAnimations';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {downloadIcsCalendar, getGoogleCalendarUrl} from '../../utils/calendar';
import {Countdown} from '../Countdown/Countdown';
import {
  CornerFlourish,
  SymmetricalFloralCrest,
  WeddingSideElementLeft,
  WeddingSideElementRight,
} from '../Ornaments/IndianOrnaments';
import {WeddingLogo} from '../Ornaments/WeddingLogo';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function buildDayReel(targetDay: string): string[] {
  const days: string[] = ['DATE'];
  for (let cycle = 0; cycle < 2; cycle++) {
    for (let d = 1; d <= 31; d++) {
      days.push(String(d).padStart(2, '0'));
    }
  }
  const normalized = targetDay.padStart(2, '0');
  days.push(normalized);
  return days;
}

function buildMonthReel(targetMonth: string): string[] {
  const list: string[] = ['MONTH'];
  for (let cycle = 0; cycle < 3; cycle++) {
    list.push(...MONTHS);
  }
  list.push(targetMonth.toUpperCase());
  return list;
}

function buildYearReel(targetYear: string): string[] {
  const targetNum = Number(targetYear) || 2027;
  const years: string[] = ['YEAR'];
  for (let cycle = 0; cycle < 3; cycle++) {
    for (let y = targetNum - 5; y <= targetNum + 4; y++) {
      years.push(String(y));
    }
  }
  years.push(String(targetNum));
  return years;
}

export const DateReveal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const dayStripRef = useRef<HTMLDivElement>(null);
  const monthStripRef = useRef<HTMLDivElement>(null);
  const yearStripRef = useRef<HTMLDivElement>(null);
  const saveTheDateRef = useRef<HTMLDivElement>(null);
  const reelTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [status, setStatus] = useState<'hidden' | 'spinning' | 'revealed'>('hidden');
  const reducedMotion = useReducedMotion();

  const dayReel = useMemo(() => buildDayReel(weddingConfig.displayDateNumber), []);
  const monthReel = useMemo(() => buildMonthReel(weddingConfig.displayMonthShort), []);
  const yearReel = useMemo(() => buildYearReel(weddingConfig.displayYear), []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-date-crest], [data-date-side], [data-reel-box], [data-date-cta]', {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateX: 0,
        });
        return;
      }

      gsap.fromTo(
        '[data-date-crest]',
        {scale: 0.78, y: 18, opacity: 0},
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '[data-date-side="left"]',
        {x: -36, opacity: 0},
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '[data-date-side="right"]',
        {x: 36, opacity: 0},
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '[data-reel-box]',
        {y: 34, rotateX: 20, opacity: 0, transformPerspective: 900},
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '[data-date-cta]',
        {y: 16, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      animateDrawPaths(sectionRef.current, reducedMotion, 'top 82%');
    }, sectionRef);

    return () => {
      reelTimelineRef.current?.kill();
      ctx.revert();
    };
  }, [reducedMotion]);

  const handleRevealDate = () => {
    if (status === 'spinning') return;

    reelTimelineRef.current?.kill();

    if (reducedMotion) {
      if (dayStripRef.current) {
        gsap.set(dayStripRef.current, {yPercent: -((dayReel.length - 1) / dayReel.length) * 100});
      }
      if (monthStripRef.current) {
        gsap.set(monthStripRef.current, {
          yPercent: -((monthReel.length - 1) / monthReel.length) * 100,
        });
      }
      if (yearStripRef.current) {
        gsap.set(yearStripRef.current, {yPercent: -((yearReel.length - 1) / yearReel.length) * 100});
      }
      setStatus('revealed');
      return;
    }

    setStatus('spinning');

    // Reset reels cleanly to placeholder index 0 before spinning
    gsap.set([dayStripRef.current, monthStripRef.current, yearStripRef.current], {yPercent: 0});
    gsap.set('[data-reel-box]', {boxShadow: 'inset 0 6px 14px rgba(37,10,17,0.55)'});

    const dayTargetPct = -((dayReel.length - 1) / dayReel.length) * 100;
    const monthTargetPct = -((monthReel.length - 1) / monthReel.length) * 100;
    const yearTargetPct = -((yearReel.length - 1) / yearReel.length) * 100;

    const tl = gsap.timeline({
      onComplete: () => {
        setStatus('revealed');
      },
    });
    reelTimelineRef.current = tl;

    // 1. Day reel stops first
    tl.to(
      dayStripRef.current,
      {
        yPercent: dayTargetPct,
        duration: 1.75,
        ease: 'power4.out',
      },
      0,
    )
      // 2. Month reel stops second
      .to(
        monthStripRef.current,
        {
          yPercent: monthTargetPct,
          duration: 2.35,
          ease: 'power4.out',
        },
        0.1,
      )
      // 3. Year reel stops last
      .to(
        yearStripRef.current,
        {
          yPercent: yearTargetPct,
          duration: 2.95,
          ease: 'power4.out',
        },
        0.2,
      )
      // 4. Delicate gold highlight pulse on revealed plaques
      .to(
        '[data-reel-box]',
        {
          boxShadow: '0 0 0 1px #D8B77C, 0 8px 22px -6px rgba(197,154,82,0.45)',
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
        },
        2.95,
      )
      // 5. Reveal "SAVE THE DATE" & supporting couple details
      .fromTo(
        saveTheDateRef.current,
        {opacity: 0, y: 12},
        {opacity: 1, y: 0, duration: 0.65, ease: 'power3.out'},
        3.05,
      );
  };

  const handleReplay = () => {
    if (status === 'spinning') return;
    setStatus('hidden');
    gsap.set([dayStripRef.current, monthStripRef.current, yearStripRef.current], {yPercent: 0});
    window.requestAnimationFrame(() => {
      handleRevealDate();
    });
  };

  const renderReel = (
    items: string[],
    ref: React.RefObject<HTMLDivElement | null>,
    isPlaceholderVisible: boolean,
    ariaLabel: string,
  ) => (
    <div
      data-reel-box
      aria-label={ariaLabel}
      className="relative bg-gradient-to-b from-[#30121D] via-[#421724] to-[#1F1016] text-[#F4E9D5] border border-[#C6A36A] h-20 sm:h-28 md:h-34 lg:h-36 overflow-hidden select-none"
      style={{boxShadow: 'inset 0 6px 14px rgba(18,6,11,0.6)'}}
    >
      {/* Inner gold hairline frame */}
      <div
        className="pointer-events-none absolute inset-1 sm:inset-1.5 border border-[#D9BD8B]/40 z-20"
        aria-hidden="true"
      />
      <CornerFlourish
        position="tl"
        className="pointer-events-none absolute top-1 left-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#D9BD8B]/65 z-20"
      />
      <CornerFlourish
        position="br"
        className="pointer-events-none absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#D9BD8B]/65 z-20"
      />

      {/* Top/Bottom depth fade masks inside reel window */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#1F1016]/85 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#1F1016]/85 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Vertical Reel Strip */}
      <div ref={ref} className="w-full will-change-transform">
        {items.map((val, idx) => {
          const isPlaceholder = idx === 0;
          return (
            <div
              key={`${val}-${idx}`}
              className="h-20 sm:h-28 md:h-34 lg:h-36 w-full flex items-center justify-center px-1"
            >
              <span
                className={`tabular-nums leading-none ${
                  isPlaceholder && isPlaceholderVisible
                    ? 'font-ui text-[10px] sm:text-xs md:text-sm tracking-[0.22em] text-[#D9BD8B]'
                    : 'font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-[3.35rem] tracking-wider text-[#F7F0E5]'
                }`}
              >
                {isPlaceholder ? `<${val}>` : val}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="date-reveal"
      ref={sectionRef}
      className="relative bg-[#F7F0E5] text-[#352720] py-14 sm:py-20 md:py-24 px-5 sm:px-8 overflow-hidden paper-grain"
    >
      <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto text-center">
        {/* Upper-Center Symmetrical Floral Ornament */}
        <div data-date-crest className="flex justify-center text-[#C59A52] mb-5 sm:mb-7 md:mb-9">
          <SymmetricalFloralCrest className="w-40 sm:w-52 md:w-64 lg:w-72 h-14 sm:h-16 md:h-20" />
        </div>

        {/* Left & Right Traditional Wedding Illustrations + Three Casino Date Reels */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-10">
          <div data-date-side="left" className="hidden sm:flex items-center text-[#651E2B]/80 shrink-0">
            <WeddingSideElementLeft className="w-11 h-11 md:w-14 md:h-14 lg:w-16 lg:h-16" />
          </div>

          {/* Three Balanced Reel Plaques — Always Fit One Line on Mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-5 w-full max-w-[330px] sm:max-w-[490px] md:max-w-[620px] lg:max-w-[680px]">
            {renderReel(
              dayReel,
              dayStripRef,
              status === 'hidden',
              status === 'revealed' ? `Day ${weddingConfig.displayDateNumber}` : 'Wedding Day',
            )}
            {renderReel(
              monthReel,
              monthStripRef,
              status === 'hidden',
              status === 'revealed' ? `Month ${weddingConfig.displayMonth}` : 'Wedding Month',
            )}
            {renderReel(
              yearReel,
              yearStripRef,
              status === 'hidden',
              status === 'revealed' ? `Year ${weddingConfig.displayYear}` : 'Wedding Year',
            )}
          </div>

          <div data-date-side="right" className="hidden sm:flex items-center text-[#651E2B]/80 shrink-0">
            <WeddingSideElementRight className="w-11 h-11 md:w-14 md:h-14 lg:w-16 lg:h-16" />
          </div>
        </div>

        {/* Interactive Reveal Prompt & Controls */}
        <div data-date-cta className="mt-6 sm:mt-8 md:mt-10">
          <p className="font-ui type-label uppercase text-[#421724]">
            {status === 'revealed' ? 'Save the Date' : 'The Big Day'}
          </p>

          {status !== 'revealed' ? (
            <div className="mt-4 md:mt-5">
              <button
                type="button"
                disabled={status === 'spinning'}
                onClick={handleRevealDate}
                className="min-h-[42px] md:min-h-[48px] px-7 py-2.5 md:px-9 md:py-3 bg-[#421724] hover:bg-[#30121D] disabled:opacity-70 text-[#F4E9D5] border border-[#C6A36A] font-ui text-[11px] md:text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                {status === 'spinning' ? 'Revealing Date...' : 'Reveal Our Date'}
              </button>
            </div>
          ) : (
            <div ref={saveTheDateRef} className="mt-3 md:mt-5">
              <div aria-label={`${weddingConfig.brideName} & ${weddingConfig.groomName}`}>
                <WeddingLogo variant="dark" size="lg" />
              </div>
              <p className="mt-1 md:mt-2 font-body italic type-body text-[#352720]/75">
                {weddingConfig.displayDay} · {weddingConfig.weddingLocation}
              </p>

              <div className="mt-5 md:mt-6 max-w-md md:max-w-lg mx-auto">
                <Countdown />
              </div>

              <div className="mt-5 md:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] md:min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-[#421724] hover:bg-[#30121D] text-[#F4E9D5] border border-[#C6A36A]/75 font-ui text-[11px] md:text-xs tracking-[0.16em] uppercase transition-colors whitespace-nowrap"
                >
                  <CalendarPlus className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D9BD8B]" aria-hidden="true" />
                  <span>Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={downloadIcsCalendar}
                  className="min-h-[40px] md:min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-transparent hover:bg-[#EAE0CF] text-[#421724] border border-[#421724]/40 font-ui text-[11px] md:text-xs tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                  <span>.ICS File</span>
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="min-h-[40px] md:min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 font-body italic text-sm md:text-base text-[#421724]/80 hover:text-[#30121D] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                  <span>Replay</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
