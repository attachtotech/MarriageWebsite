import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, Pause, Play, X} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {GalleryItem, galleryItems} from '../../data/gallery';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {EditorialImage} from '../Ornaments/EditorialImage';
import {CornerFlourish, LotusMedallion, OrnamentalDivider} from '../Ornaments/IndianOrnaments';
import {WeddingLogo} from '../Ornaments/WeddingLogo';

type HangingNode =
  | {
      kind: 'photo';
      id: string;
      photoIndex: number;
      item: GalleryItem;
      stringHeightClass: string;
      widthClass: string;
      aspectClass: string;
      tiltDeg: number;
    }
  | {
      kind: 'invitation';
      id: string;
      stringHeightClass: string;
      widthClass: string;
      tiltDeg: number;
    };

const HANGING_NODES: HangingNode[] = [
  {
    kind: 'photo',
    id: 'hang-1',
    photoIndex: 0,
    item: galleryItems[0],
    stringHeightClass: 'h-7 sm:h-10 md:h-12',
    widthClass: 'w-[162px] sm:w-[215px] md:w-[250px] lg:w-[285px]',
    aspectClass: 'aspect-[3/4]',
    tiltDeg: -0.9,
  },
  {
    kind: 'photo',
    id: 'hang-2',
    photoIndex: 1,
    item: galleryItems[1],
    stringHeightClass: 'h-12 sm:h-16 md:h-20',
    widthClass: 'w-[190px] sm:w-[250px] md:w-[290px] lg:w-[330px]',
    aspectClass: 'aspect-[4/3]',
    tiltDeg: 1.1,
  },
  {
    kind: 'photo',
    id: 'hang-3',
    photoIndex: 2,
    item: galleryItems[2],
    stringHeightClass: 'h-6 sm:h-9 md:h-11',
    widthClass: 'w-[155px] sm:w-[205px] md:w-[240px] lg:w-[275px]',
    aspectClass: 'aspect-[3/4]',
    tiltDeg: -1.1,
  },
  {
    kind: 'invitation',
    id: 'hang-center-message',
    stringHeightClass: 'h-10 sm:h-14 md:h-16',
    widthClass: 'w-[185px] sm:w-[240px] md:w-[280px] lg:w-[320px]',
    tiltDeg: 0.7,
  },
  {
    kind: 'photo',
    id: 'hang-4',
    photoIndex: 3,
    item: galleryItems[3],
    stringHeightClass: 'h-8 sm:h-11 md:h-14',
    widthClass: 'w-[192px] sm:w-[252px] md:w-[292px] lg:w-[332px]',
    aspectClass: 'aspect-[4/3]',
    tiltDeg: -0.8,
  },
  {
    kind: 'photo',
    id: 'hang-5',
    photoIndex: 4,
    item: galleryItems[4],
    stringHeightClass: 'h-12 sm:h-16 md:h-20',
    widthClass: 'w-[185px] sm:w-[240px] md:w-[280px] lg:w-[320px]',
    aspectClass: 'aspect-[4/3]',
    tiltDeg: 1.0,
  },
  {
    kind: 'photo',
    id: 'hang-6',
    photoIndex: 5,
    item: galleryItems[5],
    stringHeightClass: 'h-7 sm:h-10 md:h-12',
    widthClass: 'w-[182px] sm:w-[235px] md:w-[275px] lg:w-[315px]',
    aspectClass: 'aspect-[4/3]',
    tiltDeg: -0.85,
  },
];

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const loopTweenRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    if (reducedMotion) {
      gsap.set(trackRef.current, {xPercent: 0});
      return;
    }

    const mm = gsap.matchMedia();

    const setupLoop = (durationSeconds: number) => {
      const track = trackRef.current;
      if (!track) return;

      loopTweenRef.current?.kill();
      gsap.set(track, {xPercent: 0});

      loopTweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: durationSeconds,
        ease: 'none',
        repeat: -1,
      });

      if (isPaused) {
        loopTweenRef.current.pause();
      }
    };

    const ctx = gsap.context(() => {
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

      if (cordRef.current) {
        gsap.fromTo(
          cordRef.current,
          {scaleX: 0, opacity: 0.2},
          {
            scaleX: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              end: 'top 44%',
              scrub: 0.65,
            },
          },
        );
      }

      gsap.fromTo(
        '[data-pendulum]',
        {y: -26, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cordRef.current ?? sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );

      mm.add('(min-width: 1024px)', () => {
        setupLoop(34);
      });
      mm.add('(max-width: 1023px)', () => {
        setupLoop(42);
      });

      // Subtle natural pendulum swing on hanging strings + frames
      const pendulums = sectionRef.current?.querySelectorAll<HTMLElement>('[data-pendulum]');
      pendulums?.forEach((el, idx) => {
        const deg = Number(el.dataset.tilt || 0.9);
        gsap.fromTo(
          el,
          {rotation: -deg},
          {
            rotation: deg,
            duration: 3.4 + (idx % 4) * 0.45,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            transformOrigin: 'top center',
          },
        );
      });
    }, sectionRef);

    return () => {
      loopTweenRef.current?.kill();
      mm.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    if (!loopTweenRef.current) return;
    if (isPaused) {
      loopTweenRef.current.pause();
    } else {
      loopTweenRef.current.play();
    }
  }, [isPaused]);

  const handleDesktopMouseEnter = () => {
    if (window.innerWidth >= 1024 && !isPaused) {
      loopTweenRef.current?.pause();
    }
  };

  const handleDesktopMouseLeave = () => {
    if (window.innerWidth >= 1024 && !isPaused) {
      loopTweenRef.current?.play();
    }
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + galleryItems.length) % galleryItems.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % galleryItems.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  useEffect(() => {
    if (lightboxIndex === null || reducedMotion || !lightboxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lightboxRef.current,
        {opacity: 0},
        {opacity: 1, duration: 0.32, ease: 'power2.out'},
      );
      gsap.fromTo(
        '[data-lightbox-frame]',
        {scale: 0.94, opacity: 0},
        {scale: 1, opacity: 1, duration: 0.42, ease: 'power3.out'},
      );
    }, lightboxRef);

    return () => ctx.revert();
  }, [lightboxIndex, reducedMotion]);

  const activeItem: GalleryItem | null =
    lightboxIndex !== null && galleryItems[lightboxIndex] ? galleryItems[lightboxIndex] : null;

  const renderGroup = (suffix: string, ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex items-start gap-5 sm:gap-8 pr-5 sm:pr-8 shrink-0"
    >
      {HANGING_NODES.map((node) => {
        if (node.kind === 'invitation') {
          return (
            <div
              key={`${node.id}-${suffix}`}
              data-pendulum
              data-tilt={node.tiltDeg}
              className={`shrink-0 flex flex-col items-center ${node.widthClass} will-change-transform`}
            >
              {/* Attached Vertical Hanging String */}
              <div className="flex flex-col items-center" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59A52] -mt-[2px]" />
                <span className={`w-px bg-[#C59A52]/80 ${node.stringHeightClass}`} />
                <span className="w-2 h-2 rotate-45 bg-[#651E2B] border border-[#C59A52] -mb-1 z-10" />
              </div>

              {/* Central Maroon Invitation Message Frame */}
              <div className="relative w-full bg-gradient-to-b from-[#30121D] via-[#421724] to-[#1F1016] text-[#F4E9D5] border border-[#C6A36A] p-4 sm:p-6 md:p-7 text-center shadow-md">
                <div
                  className="pointer-events-none absolute inset-1.5 border border-[#D9BD8B]/40"
                  aria-hidden="true"
                />
                <CornerFlourish
                  position="tl"
                  className="pointer-events-none absolute top-1 left-1 w-4 h-4 md:w-5 md:h-5 text-[#D9BD8B]/70"
                />
                <CornerFlourish
                  position="br"
                  className="pointer-events-none absolute bottom-1 right-1 w-4 h-4 md:w-5 md:h-5 text-[#D9BD8B]/70"
                />

                <LotusMedallion className="w-7 h-7 md:w-9 md:h-9 mx-auto text-[#D9BD8B] mb-2" />
                <p className="font-ui text-[9px] md:text-[11px] tracking-[0.22em] uppercase text-[#D9BD8B]">
                  {weddingConfig.displayDate}
                </p>
                <h3 className="mt-1.5 font-display italic text-lg sm:text-2xl md:text-[1.7rem] text-[#F7F0E5] leading-snug text-balance">
                  “{weddingConfig.hangingGalleryQuote}”
                </h3>
                <div className="my-2.5 md:my-3 h-px w-10 md:w-14 mx-auto bg-[#D9BD8B]/45" aria-hidden="true" />
                <WeddingLogo variant="champagne" size="sm" />
              </div>
            </div>
          );
        }

        return (
          <div
            key={`${node.id}-${suffix}`}
            data-pendulum
            data-tilt={node.tiltDeg}
            className={`shrink-0 flex flex-col items-center ${node.widthClass} will-change-transform`}
          >
            {/* Attached Vertical Hanging String */}
            <div className="flex flex-col items-center" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59A52] -mt-[2px]" />
              <span className={`w-px bg-[#651E2B]/55 ${node.stringHeightClass}`} />
              <span className="w-2 h-2 rotate-45 bg-[#C59A52] border border-[#651E2B] -mb-1 z-10" />
            </div>

            <button
              type="button"
              tabIndex={ariaHidden ? -1 : 0}
              onClick={() => setLightboxIndex(node.photoIndex)}
              aria-label={`View ${node.item.title}`}
              className="group w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C59A52]"
            >
              <div className="relative bg-[#F8F5EC] p-2 sm:p-2.5 md:p-3 border border-[#651E2B]/40 shadow-md transition-transform duration-300 group-hover:-translate-y-0.5">
                <div
                  className="pointer-events-none absolute inset-1 border border-[#C59A52]/40"
                  aria-hidden="true"
                />
                <div className={`relative overflow-hidden bg-[#EAE0CF] ${node.aspectClass}`}>
                  <EditorialImage
                    src={node.item.image}
                    alt={node.item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fallbackTitle={node.item.title}
                  />
                </div>
              </div>
              <p className="mt-2 md:mt-2.5 text-center font-display italic text-sm sm:text-base md:text-lg text-[#651E2B] truncate px-1">
                {node.item.title}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-[#F2EBDD] text-[#352720] py-14 sm:py-20 md:py-24 overflow-x-clip paper-grain"
    >
      {/* Compact Header & Pause Control */}
      <div ref={headingRef} className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-5 sm:px-8 text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="font-display type-section font-medium text-[#651E2B]">
          Moments &amp; Portraits
        </h2>
        <OrnamentalDivider className="my-3.5" variant="gold" />

        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-pressed={isPaused}
            className="mt-1 inline-flex items-center gap-2 min-h-[36px] md:min-h-[42px] px-3.5 py-1 md:px-5 md:py-1.5 border border-[#C59A52]/65 bg-[#F8F5EC]/80 hover:bg-[#F8F5EC] text-[#651E2B] font-ui text-[10px] md:text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 md:w-3.5 md:h-3.5" aria-hidden="true" />
                <span>Resume Gallery</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 md:w-3.5 md:h-3.5" aria-hidden="true" />
                <span>Pause Gallery</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Continuous Seamless Hanging Installation */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleDesktopMouseEnter}
        onMouseLeave={handleDesktopMouseLeave}
      >
        {/* Continuous Top Hanging Cord */}
        <div
          ref={cordRef}
          className="absolute top-0 inset-x-0 h-[1.5px] origin-center bg-gradient-to-r from-[#C59A52]/30 via-[#C59A52] to-[#C59A52]/30 z-10 will-change-transform"
          aria-hidden="true"
        />

        {/* Duplicated Seamless Loop Track */}
        <div ref={trackRef} className="flex items-start w-max will-change-transform pb-3">
          {renderGroup('primary', false)}
          {renderGroup('duplicate', true)}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {activeItem && lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-[#1F1016]/95 text-[#F4E9D5] flex flex-col justify-between p-4 sm:p-8"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(deltaX) > 45) {
              if (deltaX > 0) showPrev();
              else showNext();
            }
          }}
        >
          <div className="flex items-center justify-between border-b border-[#C59A52]/25 pb-3">
            <span className="font-ui text-xs tracking-[0.2em] uppercase text-[#D8B77C] tabular-nums">
              {lightboxIndex + 1} / {galleryItems.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close photograph viewer"
              className="min-w-[42px] min-h-[42px] inline-flex items-center justify-center border border-[#C59A52]/45 text-[#F8F5EC] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photograph"
              className="hidden sm:inline-flex min-w-[42px] min-h-[42px] items-center justify-center border border-[#C59A52]/40 hover:bg-[#651E2B] mr-4 shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              data-lightbox-frame
              className="p-2 bg-[#F8F5EC]/5 border border-[#C59A52]/50 max-h-full flex items-center justify-center"
            >
              <EditorialImage
                src={activeItem.image}
                alt={activeItem.title}
                loading="eager"
                className="max-h-[68vh] sm:max-h-[74vh] w-auto object-contain"
                fallbackTitle={activeItem.title}
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="hidden sm:inline-flex min-w-[42px] min-h-[42px] items-center justify-center border border-[#C59A52]/40 hover:bg-[#651E2B] ml-4 shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#C59A52]/25 pt-3">
            <div className="text-center sm:text-left">
              <h3 className="font-display text-2xl text-[#FFFFFF]">{activeItem.title}</h3>
              <p className="font-body italic text-sm text-[#F8F5EC]/80">{activeItem.location}</p>
            </div>
            <div className="flex sm:hidden items-center gap-4">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photograph"
                className="min-w-[42px] min-h-[42px] inline-flex items-center justify-center border border-[#C59A52]/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photograph"
                className="min-w-[42px] min-h-[42px] inline-flex items-center justify-center border border-[#C59A52]/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
