import React, {useEffect, useRef, useState} from 'react';
import {ArrowUp, Check, Instagram, Mail, Phone, Share2} from 'lucide-react';
import {gsap} from '../../animations/gsapConfig';
import {weddingConfig} from '../../data/weddingConfig';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import {LotusMedallion, OrnamentalDivider} from '../Ornaments/IndianOrnaments';
import {WeddingLogo} from '../Ornaments/WeddingLogo';

interface FooterProps {
  onBackToTop: () => void;
  onReplayCover: () => void;
}

export const Footer: React.FC<FooterProps> = ({onBackToTop, onReplayCover}) => {
  const [shareFeedback, setShareFeedback] = useState<'idle' | 'copied'>('idle');
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!footerRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-footer-crest]',
        {scale: 0.8, y: 18, opacity: 0},
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '[data-footer-stagger]',
        {y: 14, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleShare = async () => {
    const shareData = {
      title: `${weddingConfig.brideName} & ${weddingConfig.groomName} | Wedding Invitation`,
      text: `Join us as we celebrate the wedding of ${weddingConfig.brideName} and ${weddingConfig.groomName} on ${weddingConfig.displayDate}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback('copied');
      window.setTimeout(() => setShareFeedback('idle'), 2600);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#F7F0E5] text-[#352720] border-t border-[#C6A36A]/45 py-12 sm:py-14 px-5 sm:px-8 paper-grain overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 data-footer-crest aria-label={`${weddingConfig.brideName} & ${weddingConfig.groomName}`}>
          <WeddingLogo variant="dark" size="lg" />
        </h2>
        <p data-footer-stagger className="mt-1 font-ui text-[10px] tracking-[0.22em] uppercase text-[#352720]/70">
          {weddingConfig.displayDate} · {weddingConfig.weddingLocation}
        </p>

        <div data-footer-stagger className="w-full max-w-xs my-5">
          <OrnamentalDivider variant="gold" />
        </div>

        <div data-footer-stagger className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 type-body font-body text-[#352720]/85">
          {weddingConfig.contact.email && (
            <a
              href={`mailto:${weddingConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#30121D] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C6A36A]" aria-hidden="true" />
              <span>{weddingConfig.contact.email}</span>
            </a>
          )}
          {weddingConfig.contact.phone && (
            <a
              href={`tel:${weddingConfig.contact.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-[#30121D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A36A]" aria-hidden="true" />
              <span>{weddingConfig.contact.phone}</span>
            </a>
          )}
          {weddingConfig.socialLinks.instagram && (
            <a
              href={weddingConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#30121D] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C6A36A]" aria-hidden="true" />
              <span>Instagram</span>
            </a>
          )}
        </div>

        <div data-footer-stagger className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handleShare}
            className="min-h-[38px] inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#C6A36A]/70 text-[#30121D] hover:bg-[#F2EBDD] font-ui text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            {shareFeedback === 'copied' ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#30121D]" aria-hidden="true" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#C6A36A]" aria-hidden="true" />
                <span>Share Invitation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReplayCover}
            className="min-h-[38px] inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#30121D]/30 text-[#352720]/80 hover:text-[#30121D] hover:border-[#30121D] font-ui text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Replay Opening</span>
          </button>

          <button
            type="button"
            onClick={onBackToTop}
            className="min-h-[38px] inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#30121D] hover:bg-[#421724] text-[#F4E9D5] border border-[#C6A36A]/70 font-ui text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#D9BD8B]" aria-hidden="true" />
            <span>Back to Top</span>
          </button>
        </div>

        <LotusMedallion className="w-6 h-6 text-[#C6A36A]/65 mt-6 mb-2" />

        <p className="font-body italic text-xs text-[#352720]/60">
          {weddingConfig.credits}
        </p>
      </div>
    </footer>
  );
};
