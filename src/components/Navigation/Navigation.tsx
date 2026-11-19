import React, {useEffect, useRef, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {WeddingLogo} from '../Ornaments/WeddingLogo';

interface NavigationProps {
  onNavigate: (targetId: string) => void;
}

const NAV_LINKS = [
  {id: 'timeline', label: 'Events'},
  {id: 'date-reveal', label: 'Date'},
  {id: 'venue', label: 'Venue'},
  {id: 'gallery', label: 'Gallery'},
  {id: 'things-to-know', label: 'Details'},
];

export const Navigation: React.FC<NavigationProps> = ({onNavigate}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!progressBarRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressBarRef.current,
        {scaleX: 0},
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!mobileOpen || reducedMotion || !mobileDrawerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mobileDrawerRef.current,
        {opacity: 0},
        {opacity: 1, duration: 0.3, ease: 'power2.out'},
      );
      gsap.fromTo(
        '[data-mobile-nav-item]',
        {y: 16, opacity: 0},
        {y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.08, ease: 'power3.out'},
      );
    }, mobileDrawerRef);

    return () => ctx.revert();
  }, [mobileOpen, reducedMotion]);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#F7F0E5]/95 text-[#30121D] border-b border-[#C6A36A]/40 shadow-xs'
            : 'bg-gradient-to-b from-[#1F1016]/70 to-transparent text-[#F4E9D5]'
        }`}
      >
        <div className="max-w-5xl lg:max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-between gap-6">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            aria-label={weddingConfig.brandName}
            className="whitespace-nowrap shrink-0 flex items-center"
          >
            <WeddingLogo variant={scrolled ? 'dark' : 'light'} size="xs" />
          </a>

          <nav
            aria-label="Wedding sections"
            className="hidden md:flex items-center gap-6 md:gap-8 lg:gap-10 font-ui text-[11px] md:text-xs lg:text-[13px] tracking-[0.18em] uppercase"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A36A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick('rsvp')}
              className={`min-h-[34px] md:min-h-[40px] px-3.5 py-1 md:px-5 md:py-1.5 font-ui text-[10px] md:text-xs tracking-[0.2em] uppercase border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                scrolled
                  ? 'bg-[#30121D] text-[#F4E9D5] border-[#C6A36A] hover:bg-[#421724]'
                  : 'bg-[#30121D]/65 text-[#F4E9D5] border-[#D9BD8B]/70 hover:bg-[#421724]'
              }`}
            >
              RSVP
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden min-w-[38px] min-h-[38px] inline-flex items-center justify-center cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Continuous Antique Gold Reading Progress Ribbon */}
        <div
          ref={progressBarRef}
          aria-hidden="true"
          className="h-[2px] w-full origin-left bg-gradient-to-r from-[#C6A36A] via-[#E5C995] to-[#C6A36A] will-change-transform"
          style={{transform: reducedMotion ? 'scaleX(0)' : undefined}}
        />
      </header>

      {mobileOpen && (
        <div
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 md:hidden bg-[#30121D] text-[#F4E9D5] flex flex-col justify-between p-6 paper-grain"
        >
          <div className="flex items-center justify-between border-b border-[#C6A36A]/30 pb-4">
            <WeddingLogo variant="light" size="xs" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center border border-[#C6A36A]/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-4 my-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                data-mobile-nav-item
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="font-display text-2xl text-[#F4E9D5] hover:text-[#D9BD8B] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-mobile-nav-item
              onClick={() => handleLinkClick('rsvp')}
              className="mt-3 min-h-[42px] px-7 py-2.5 bg-[#421724] text-[#F4E9D5] border border-[#C6A36A] font-ui text-[11px] tracking-[0.2em] uppercase"
            >
              Confirm RSVP
            </button>
          </nav>

          <p className="text-center font-ui text-[10px] tracking-[0.2em] uppercase text-[#D9BD8B]/80 border-t border-[#C6A36A]/25 pt-4">
            {weddingConfig.displayDate} · {weddingConfig.weddingLocation}
          </p>
        </div>
      )}
    </>
  );
};
