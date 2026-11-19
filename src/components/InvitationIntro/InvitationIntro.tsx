import React, {useCallback, useEffect, useRef, useState} from 'react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {CornerFlourish} from '../Ornaments/IndianOrnaments';
import {HangingPalaceLantern, MarriageArchCrown} from '../Ornaments/MarriageDoorFrame';
import {WeddingLogo} from '../Ornaments/WeddingLogo';

export const INTRO_SESSION_KEY = 'wedding_video_intro_v2';
const OPENING_VIDEO_SRC =
  '/assets/aistudio/82affc48339d8e8c15b7f3d349e97be8_720w_9ed68f8b.mp4#t=0.001';

const AMBIENT_MOTES = [
  {left: '12%', top: '28%', size: 4, delay: '0s'},
  {left: '19%', top: '68%', size: 3, delay: '0.6s'},
  {left: '26%', top: '44%', size: 3.5, delay: '1.2s'},
  {left: '74%', top: '34%', size: 3.5, delay: '0.4s'},
  {left: '82%', top: '62%', size: 4, delay: '1.0s'},
  {left: '88%', top: '24%', size: 3, delay: '1.6s'},
];

interface InvitationIntroProps {
  isOpen: boolean;
  onRevealWebsite: () => void;
  onComplete: (startAudio?: boolean) => void;
}

export const InvitationIntro: React.FC<InvitationIntroProps> = ({
  isOpen,
  onRevealWebsite,
  onComplete,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const doorwayWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sealButtonRef = useRef<HTMLButtonElement>(null);
  const sealWrapRef = useRef<HTMLDivElement>(null);
  const portalCrestRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredEntryRef = useRef(false);
  const hasShownPortalCrestRef = useRef(false);

  const [phase, setPhase] = useState<'idle' | 'playing' | 'entering'>('idle');
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const startSmoothEntry = useCallback(
    (withAudio: boolean) => {
      if (hasTriggeredEntryRef.current) return;
      hasTriggeredEntryRef.current = true;
      setPhase('entering');

      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
      } catch {
        // Ignore storage errors
      }

      onRevealWebsite();

      if (reducedMotion || !overlayRef.current) {
        onComplete(withAudio);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => onComplete(withAudio),
      });

      if (veilRef.current) {
        tl.to(
          veilRef.current,
          {
            opacity: 0.92,
            duration: 0.45,
            ease: 'sine.inOut',
            force3D: true,
          },
          0,
        );
      }

      if (doorwayWrapRef.current) {
        tl.to(
          doorwayWrapRef.current,
          {
            scale: 1.07,
            duration: 1.05,
            ease: 'power2.inOut',
            force3D: true,
          },
          0,
        );
      }

      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.95,
          ease: 'sine.inOut',
          force3D: true,
        },
        0.12,
      );
    },
    [onComplete, onRevealWebsite, reducedMotion],
  );

  useEffect(() => {
    if (!isOpen) {
      hasTriggeredEntryRef.current = false;
      hasShownPortalCrestRef.current = false;
      setPhase('idle');
      return;
    }

    hasTriggeredEntryRef.current = false;
    hasShownPortalCrestRef.current = false;
    setPhase('idle');

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 2) {
        setVideoReady(true);
      }
      video.pause();
      try {
        video.currentTime = 0.001;
      } catch {
        // Ignore seek errors before metadata
      }
    }

    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.set(overlayRef.current, {opacity: 1});
      }
      if (doorwayWrapRef.current) {
        gsap.set(doorwayWrapRef.current, {scale: 1});
      }
      if (veilRef.current) {
        gsap.set(veilRef.current, {opacity: 0});
      }
      if (portalCrestRef.current) {
        gsap.set(portalCrestRef.current, {opacity: 0, scale: 0.9});
      }
      if (sealWrapRef.current) {
        gsap.set(sealWrapRef.current, {opacity: 1, scale: 1});
      }

      if (!reducedMotion) {
        if (doorwayWrapRef.current) {
          gsap.fromTo(
            doorwayWrapRef.current,
            {y: 16, opacity: 0, scale: 0.97},
            {y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', force3D: true},
          );
        }

        if (sealButtonRef.current) {
          gsap.fromTo(
            sealButtonRef.current,
            {scale: 0.86, opacity: 0},
            {scale: 1, opacity: 1, duration: 0.75, delay: 0.2, ease: 'power3.out', force3D: true},
          );
        }

        // Gentle swaying palace lanterns
        const lanterns = overlayRef.current?.querySelectorAll<HTMLElement>('[data-palace-lantern]');
        lanterns?.forEach((el, idx) => {
          gsap.fromTo(
            el,
            {rotation: idx === 0 ? -2.2 : 2.2},
            {
              rotation: idx === 0 ? 2.2 : -2.2,
              duration: 3.2 + idx * 0.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              transformOrigin: 'top center',
            },
          );
        });

        // Subtle floating golden candle motes in deep burgundy backdrop
        const motes = overlayRef.current?.querySelectorAll<HTMLElement>('[data-gold-mote]');
        motes?.forEach((mote, idx) => {
          gsap.to(mote, {
            y: -18 - (idx % 3) * 8,
            opacity: 0.65,
            duration: 2.6 + (idx % 3) * 0.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: idx * 0.25,
          });
        });
      }
    }, overlayRef);

    return () => {
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [isOpen, reducedMotion]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        startSmoothEntry(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, startSmoothEntry]);

  const handleSealClick = async () => {
    if (phase !== 'idle') return;

    if (reducedMotion) {
      startSmoothEntry(true);
      return;
    }

    setPhase('playing');

    if (sealWrapRef.current) {
      gsap.to(sealWrapRef.current, {
        scale: 0.84,
        opacity: 0,
        duration: 0.36,
        ease: 'power2.inOut',
        force3D: true,
      });
    }

    const video = videoRef.current;
    if (!video) {
      startSmoothEntry(true);
      return;
    }

    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      startSmoothEntry(false);
    }
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || phase !== 'playing' || !Number.isFinite(video.duration) || video.duration <= 0.6) {
      return;
    }

    // Reveal the warm white/off-white interior and dark crest right as the gatefold doors part
    if (!hasShownPortalCrestRef.current && video.currentTime >= video.duration - 1.35) {
      hasShownPortalCrestRef.current = true;
      if (veilRef.current && !reducedMotion) {
        gsap.to(veilRef.current, {
          opacity: 0.56,
          duration: 0.85,
          ease: 'sine.inOut',
          force3D: true,
        });
      }
      if (portalCrestRef.current && !reducedMotion) {
        gsap.to(portalCrestRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: 0.12,
          ease: 'power2.out',
          force3D: true,
        });
      }
    }

    if (video.currentTime >= video.duration - 0.36) {
      startSmoothEntry(true);
    }
  };

  const handleVideoEnded = () => {
    startSmoothEntry(true);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Opening"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#30121D] text-[#F4E9D5] px-3 py-3 overflow-hidden select-none paper-grain will-change-transform"
      style={{
        backgroundColor: '#30121D',
        backgroundImage:
          'radial-gradient(circle at 50% 46%, #421724 0%, #30121D 55%, #230B14 100%)',
      }}
    >
      {/* Subtle Deep Burgundy Outer Palace Frame & Corner Filigrees */}
      <div
        className="pointer-events-none absolute inset-3 sm:inset-5 md:inset-7 border border-[#C6A36A]/28"
        aria-hidden="true"
      >
        <CornerFlourish position="tl" className="absolute -top-1 -left-1 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#C6A36A]/60" />
        <CornerFlourish position="tr" className="absolute -top-1 -right-1 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#C6A36A]/60" />
        <CornerFlourish position="bl" className="absolute -bottom-1 -left-1 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#C6A36A]/60" />
        <CornerFlourish position="br" className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#C6A36A]/60" />
      </div>

      {/* Warm Candlelit Gold Motes Around the Marriage Doorway */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {AMBIENT_MOTES.map((mote, idx) => (
          <span
            key={idx}
            data-gold-mote
            className="absolute rounded-full bg-[#F5D99E]/30 blur-[0.5px]"
            style={{
              left: mote.left,
              top: mote.top,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              opacity: 0.25,
            }}
          />
        ))}
      </div>

      {/* Royal Marriage Doorway Ensemble */}
      <div
        ref={doorwayWrapRef}
        className="relative z-10 flex flex-col items-center will-change-transform"
      >
        {/* Sacred Invocation Whisper Above Palace Arch */}
        <p
          lang="sa"
          style={{fontFamily: 'var(--font-devanagari)'}}
          className="mb-1 md:mb-1.5 text-[11px] sm:text-xs md:text-sm lg:text-base text-[#D9BD8B]/90 tracking-wider"
        >
          {weddingConfig.ganeshayNamahDevanagari}
        </p>

        {/* Doorway Container — Compact on Mobile, Prominent Cinematic Scale on Tablet & Desktop */}
        <div className="relative flex flex-col items-center pt-15 sm:pt-18 md:pt-24 lg:pt-28 xl:pt-32 pb-4 md:pb-5">
          {/* Hanging Palace Brass Lanterns Flanking the Marriage Door (Tablet & Desktop) */}
          <div
            data-palace-lantern
            className="hidden sm:block pointer-events-none absolute -left-18 md:-left-26 lg:-left-34 top-8 md:top-12 z-10"
          >
            <HangingPalaceLantern className="w-12 h-36 md:w-16 md:h-48 lg:w-20 lg:h-56" />
          </div>
          <div
            data-palace-lantern
            className="hidden sm:block pointer-events-none absolute -right-18 md:-right-26 lg:-right-34 top-8 md:top-12 z-10"
          >
            <HangingPalaceLantern className="w-12 h-36 md:w-16 md:h-48 lg:w-20 lg:h-56" />
          </div>

          {/* Architectural Carved Door Pillar Frame Around Gatefold Doors */}
          <div className="relative p-1.5 sm:p-2 md:p-2.5 bg-gradient-to-b from-[#421724] via-[#30121D] to-[#210A12] border border-[#C6A36A]/75 shadow-2xl">
            {/* Carved Gold Palace Arch Crown + Hanging Toran Bandanwar */}
            <div className="pointer-events-none absolute bottom-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-[calc(100%+18px)] md:w-[calc(100%+28px)] z-20">
              <MarriageArchCrown className="w-full h-auto drop-shadow-md" />
            </div>

            <div
              className="pointer-events-none absolute inset-0.5 border border-[#D9BD8B]/35"
              aria-hidden="true"
            />

            {/* Gatefold Doors Stage (Pure #30121D Loading Base — Zero Light Neutral Tones) */}
            <div
              ref={stageRef}
              className="relative h-[min(64svh,calc(82vw*16/9))] aspect-[9/16] md:h-[min(68svh,720px)] md:aspect-[3/4] lg:h-[min(68svh,760px)] lg:aspect-[4/5] max-w-full overflow-hidden bg-[#30121D] border border-[#C6A36A]/70"
              style={{
                boxShadow:
                  'inset 0 0 28px rgba(24, 7, 13, 0.5), 0 24px 60px -12px rgba(10, 2, 5, 0.88)',
              }}
            >
              {/* Deep Burgundy Pre-load Gatefold Backing (Never Off-White) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#3A1420] via-[#30121D] to-[#230B14]"
              >
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[#C6A36A]/35" />
                <div className="absolute inset-3 border border-[#C6A36A]/25" />
              </div>

              <video
                ref={videoRef}
                src={OPENING_VIDEO_SRC}
                preload="auto"
                muted
                playsInline
                onLoadedMetadata={() => {
                  setVideoReady(true);
                  if (videoRef.current && phase === 'idle') {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0.001;
                  }
                }}
                onLoadedData={() => setVideoReady(true)}
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={handleVideoEnded}
                onError={() => {
                  if (phase === 'playing') {
                    startSmoothEntry(false);
                  }
                }}
                className={`relative z-0 w-full h-full object-cover object-center block transition-opacity duration-300 ${
                  videoReady ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Warm Off-White / Ivory Interior Wash Only After Gatefold Doors Part */}
              <div
                ref={veilRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#F7F0E5] opacity-0 will-change-[opacity]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 48%, rgba(255, 252, 245, 0.62) 0%, rgba(247, 240, 229, 0.88) 60%, rgba(242, 235, 221, 0.96) 100%)',
                }}
              />

              {/* Dark Burgundy Calligraphy Crest on Warm Off-White Opened Interior */}
              <div
                ref={portalCrestRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
              >
                <WeddingLogo variant="dark" size="lg" className="drop-shadow-[0_2px_10px_rgba(247,240,229,0.85)]" />
              </div>

              {/* Center Calligraphy Logo Seal Button */}
              <div
                ref={sealWrapRef}
                aria-hidden={phase !== 'idle'}
                className="absolute inset-x-0 top-[46%] -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none will-change-transform"
              >
                <button
                  ref={sealButtonRef}
                  type="button"
                  disabled={phase !== 'idle'}
                  tabIndex={phase === 'idle' ? 0 : -1}
                  onClick={handleSealClick}
                  aria-label="Tap calligraphy seal to open wedding invitation"
                  className={`${
                    phase === 'idle' ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
                  } group relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-b from-[#4B1929] via-[#30121D] to-[#1F1016] border border-[#D9BD8B] flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95`}
                  style={{
                    boxShadow:
                      '0 12px 28px -6px rgba(24, 8, 14, 0.72), 0 0 0 4px rgba(198, 163, 106, 0.28)',
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-1.5 md:inset-2 rounded-full border border-[#C6A36A]/55"
                    aria-hidden="true"
                  />
                  {phase === 'idle' && (
                    <span
                      className="pointer-events-none absolute -inset-1.5 md:-inset-2 rounded-full border border-[#D9BD8B]/45 animate-ping"
                      style={{animationDuration: '2.6s'}}
                      aria-hidden="true"
                    />
                  )}
                  <WeddingLogo variant="champagne" size="sm" className="scale-90 sm:scale-95 md:scale-110 lg:scale-125" />
                </button>

                <button
                  type="button"
                  disabled={phase !== 'idle'}
                  tabIndex={-1}
                  onClick={handleSealClick}
                  className={`${
                    phase === 'idle' ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
                  } mt-2.5 md:mt-3.5 px-3.5 py-1 md:px-5 md:py-1.5 bg-[#30121D]/92 hover:bg-[#421724] border border-[#C6A36A]/75 text-[#F4E9D5] font-ui text-[10px] md:text-xs tracking-[0.22em] uppercase shadow-sm transition-colors`}
                >
                  {videoReady ? 'Tap to Open' : 'Open Invitation'}
                </button>
              </div>
            </div>

            {/* Stepped Architectural Marriage Door Threshold Plinth */}
            <div
              className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+14px)] md:w-[calc(100%+20px)] flex flex-col items-center"
              aria-hidden="true"
            >
              <div className="w-full h-2 md:h-2.5 bg-gradient-to-r from-[#2D0E18] via-[#4A1929] to-[#2D0E18] border border-[#C6A36A]/65 shadow-md" />
              <div className="w-[calc(100%+12px)] h-1.5 md:h-2 bg-gradient-to-r from-[#1E0810] via-[#3A1320] to-[#1E0810] border-x border-b border-[#C6A36A]/45" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Skip Action Below Threshold */}
      <div className="relative z-30 mt-3 md:mt-4">
        <button
          type="button"
          onClick={() => startSmoothEntry(false)}
          className="min-h-[34px] md:min-h-[40px] px-4 py-1 font-body italic text-sm md:text-base text-[#D9BD8B]/80 hover:text-[#F4E9D5] transition-colors cursor-pointer"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
