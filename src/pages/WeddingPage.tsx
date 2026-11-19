import React, {useCallback, useEffect, useRef, useState} from 'react';
import Lenis from 'lenis';
import {ensureGsapRegistered, gsap, ScrollTrigger} from '../animations/gsapConfig';
import {refreshScrollTriggersSoon} from '../animations/scrollAnimations';
import {AudioController} from '../components/AudioController/AudioController';
import {Ceremonies} from '../components/Ceremonies/Ceremonies';
import {DateReveal} from '../components/DateReveal/DateReveal';
import {Family} from '../components/Family/Family';
import {FinalInvitation} from '../components/FinalInvitation/FinalInvitation';
import {Footer} from '../components/Footer/Footer';
import {Gallery} from '../components/Gallery/Gallery';
import {GaneshayNamah} from '../components/GaneshayNamah/GaneshayNamah';
import {Hero} from '../components/Hero/Hero';
import {INTRO_SESSION_KEY, InvitationIntro} from '../components/InvitationIntro/InvitationIntro';
import {InvitationScroll} from '../components/InvitationScroll/InvitationScroll';
import {Navigation} from '../components/Navigation/Navigation';
import {ThingsToKnow} from '../components/ThingsToKnow/ThingsToKnow';
import {Venue} from '../components/Venue/Venue';
import {WeddingTimeline} from '../components/WeddingTimeline/WeddingTimeline';
import {useReducedMotion} from '../hooks/useReducedMotion';

ensureGsapRegistered();

export const WeddingPage: React.FC = () => {
  const [introOpen, setIntroOpen] = useState<boolean>(true);
  const [websiteRevealed, setWebsiteRevealed] = useState<boolean>(false);
  const [heroAnimated, setHeroAnimated] = useState<boolean>(false);
  const [audioTrigger, setAudioTrigger] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!websiteRevealed || reducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [websiteRevealed, reducedMotion]);

  useEffect(() => {
    if (!websiteRevealed) return;
    refreshScrollTriggersSoon();
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);
    return () => window.clearTimeout(timer);
  }, [websiteRevealed]);

  const handleRevealWebsite = useCallback(() => {
    setWebsiteRevealed(true);
    setHeroAnimated(true);
    refreshScrollTriggersSoon();
  }, []);

  const handleIntroComplete = useCallback((startAudio?: boolean) => {
    setWebsiteRevealed(true);
    setIntroOpen(false);
    setHeroAnimated(true);
    if (startAudio) {
      window.setTimeout(() => {
        setAudioTrigger((c) => c + 1);
      }, 150);
    }
    refreshScrollTriggersSoon();
  }, []);

  const scrollToSection = useCallback(
    (targetId: string) => {
      const target = document.getElementById(targetId);
      if (!target) return;

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, {offset: -48});
      } else {
        target.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth'});
      }
    },
    [reducedMotion],
  );

  const handleBackToTop = useCallback(() => {
    if (lenisRef.current && !reducedMotion) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({top: 0, behavior: reducedMotion ? 'auto' : 'smooth'});
    }
  }, [reducedMotion]);

  const handleReplayCover = useCallback(() => {
    try {
      window.sessionStorage.removeItem(INTRO_SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
    handleBackToTop();
    setHeroAnimated(false);
    setWebsiteRevealed(false);
    setIntroOpen(true);
  }, [handleBackToTop]);

  return (
    <div className="min-h-screen bg-[#F7F0E5] text-[#352720] selection:bg-[#30121D] selection:text-[#F4E9D5]">
      <InvitationIntro
        isOpen={introOpen}
        onRevealWebsite={handleRevealWebsite}
        onComplete={handleIntroComplete}
      />

      {/* Pre-mounted behind opaque intro so door-open reveal has zero React mount hitch */}
      <div
        aria-hidden={!websiteRevealed}
        className={`transition-opacity duration-700 ease-out ${
          websiteRevealed
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none select-none'
        }`}
      >
        <Navigation onNavigate={scrollToSection} />

        <main>
          <Hero readyToAnimate={heroAnimated} />
          <GaneshayNamah />
          <InvitationScroll />
          <WeddingTimeline />
          <DateReveal />
          <Venue />
          <Gallery />
          <Ceremonies />
          <Family />
          <ThingsToKnow />
          <FinalInvitation />
        </main>

        <Footer onBackToTop={handleBackToTop} onReplayCover={handleReplayCover} />
        <AudioController externalStartTrigger={audioTrigger} visible={websiteRevealed} />
      </div>
    </div>
  );
};
