import React from 'react';
import {MotifType} from '../../data/events';

interface OrnamentProps {
  className?: string;
}

export const LotusMedallion: React.FC<OrnamentProps> = ({className = 'w-14 h-14'}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
    <circle cx="60" cy="60" r="46" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" />
    <path
      data-draw-path
      d="M60 16C65 30 70 38 60 52C50 38 55 30 60 16Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      data-draw-path
      d="M60 104C65 90 70 82 60 68C50 82 55 90 60 104Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      data-draw-path
      d="M16 60C30 55 38 50 52 60C38 70 30 65 16 60Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      data-draw-path
      d="M104 60C90 55 82 50 68 60C82 70 90 65 104 60Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      data-draw-path
      d="M29 29C41 33 48 37 54 54C37 48 33 41 29 29Z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <path
      data-draw-path
      d="M91 29C79 33 72 37 66 54C83 48 87 41 91 29Z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <path
      data-draw-path
      d="M29 91C41 87 48 83 54 66C37 72 33 79 29 91Z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <path
      data-draw-path
      d="M91 91C79 87 72 83 66 66C83 72 87 79 91 91Z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <circle cx="60" cy="60" r="6" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="60" cy="60" r="2" fill="currentColor" />
  </svg>
);

export const SymmetricalFloralCrest: React.FC<OrnamentProps> = ({className = 'w-56 h-20'}) => (
  <svg viewBox="0 0 280 88" fill="none" className={className} aria-hidden="true">
    {/* Central lotus blossom */}
    <path
      data-draw-path
      d="M140 12C146 24 148 34 140 44C132 34 134 24 140 12Z"
      stroke="currentColor"
      strokeWidth="1.35"
    />
    <path
      data-draw-path
      d="M140 44C148 32 158 26 167 24C162 35 153 42 140 44Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      data-draw-path
      d="M140 44C132 32 122 26 113 24C118 35 127 42 140 44Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    {/* Sweeping symmetrical vines */}
    <path
      data-draw-path
      d="M140 50C118 50 104 64 80 64C62 64 48 54 30 56C18 57 12 63 8 68"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      data-draw-path
      d="M140 50C162 50 176 64 200 64C218 64 232 54 250 56C262 57 268 63 272 68"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    {/* Paisley buds */}
    <path
      data-draw-path
      d="M84 64C84 54 74 47 67 51C62 54 67 64 84 64Z"
      stroke="currentColor"
      strokeWidth="1.15"
    />
    <path
      data-draw-path
      d="M196 64C196 54 206 47 213 51C218 54 213 64 196 64Z"
      stroke="currentColor"
      strokeWidth="1.15"
    />
    <circle cx="140" cy="50" r="3" fill="currentColor" />
    <circle cx="44" cy="58" r="2" fill="currentColor" />
    <circle cx="236" cy="58" r="2" fill="currentColor" />
  </svg>
);

export const WeddingSideElementLeft: React.FC<OrnamentProps> = ({className = 'w-14 h-14'}) => (
  <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
    {/* Traditional Mangal Kalash & Coconut */}
    <path
      data-draw-path
      d="M24 38C19 42 18 49 20 55C23 61 29 63 36 63C43 63 49 61 52 55C54 49 53 42 48 38H24Z"
      stroke="currentColor"
      strokeWidth="1.35"
    />
    <path data-draw-path d="M25 32H47L45 38H27L25 32Z" stroke="currentColor" strokeWidth="1.25" />
    <circle data-draw-path cx="36" cy="24" r="6.5" stroke="currentColor" strokeWidth="1.25" />
    <path
      data-draw-path
      d="M28 31C21 26 17 19 16 13C22 15 27 20 30 27"
      stroke="currentColor"
      strokeWidth="1.15"
    />
    <path
      data-draw-path
      d="M44 31C51 26 55 19 56 13C50 15 45 20 42 27"
      stroke="currentColor"
      strokeWidth="1.15"
    />
  </svg>
);

export const WeddingSideElementRight: React.FC<OrnamentProps> = ({className = 'w-14 h-14'}) => (
  <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
    {/* Traditional Brass Mangal Diya & Garland */}
    <path
      data-draw-path
      d="M16 44C16 53 25 59 36 59C47 59 56 53 56 44C47 47 25 47 16 44Z"
      stroke="currentColor"
      strokeWidth="1.35"
    />
    <path
      data-draw-path
      d="M36 18C41 25 41 34 36 39C31 34 31 25 36 18Z"
      stroke="currentColor"
      strokeWidth="1.35"
    />
    <path data-draw-path d="M25 63H47" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="20" cy="28" r="1.6" fill="currentColor" />
    <circle cx="52" cy="28" r="1.6" fill="currentColor" />
    <circle cx="36" cy="11" r="1.6" fill="currentColor" />
  </svg>
);

export const OrnamentalDivider: React.FC<{className?: string; variant?: 'gold' | 'maroon'}> = ({
  className = '',
  variant = 'gold',
}) => {
  const strokeColor = variant === 'gold' ? 'text-[#C59A52]' : 'text-[#651E2B]';
  return (
    <div className={`flex items-center justify-center gap-4 ${strokeColor} ${className}`} aria-hidden="true">
      <span className="h-px flex-1 max-w-[100px] bg-current opacity-35" />
      <svg viewBox="0 0 64 20" fill="none" className="w-14 h-5 shrink-0">
        <path
          d="M2 10H22M42 10H62"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.55"
        />
        <path
          d="M32 3L39 10L32 17L25 10L32 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="10" r="2" fill="currentColor" />
        <circle cx="20" cy="10" r="1.3" fill="currentColor" fillOpacity="0.65" />
        <circle cx="44" cy="10" r="1.3" fill="currentColor" fillOpacity="0.65" />
      </svg>
      <span className="h-px flex-1 max-w-[100px] bg-current opacity-35" />
    </div>
  );
};

export const CornerFlourish: React.FC<{
  className?: string;
  position?: 'tl' | 'tr' | 'bl' | 'br';
}> = ({className = 'w-12 h-12', position = 'tl'}) => {
  const rotationMap = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-[-1]',
  };
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={`${className} ${rotationMap[position]}`}
      aria-hidden="true"
    >
      <path
        data-draw-path
        d="M4 58V18C4 10.268 10.268 4 18 4H58"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      <path
        data-draw-path
        d="M12 46V20C12 15.582 15.582 12 20 12H46"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.45"
      />
      <path
        data-draw-path
        d="M12 12C16 12 19 15 19 19C15 19 12 16 12 12Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  );
};

export const ScrollFinial: React.FC<{side: 'left' | 'right'; className?: string}> = ({
  side,
  className = 'w-10 h-44',
}) => (
  <svg
    viewBox="0 0 48 180"
    fill="none"
    className={`${className} ${side === 'right' ? 'scale-x-[-1]' : ''}`}
    aria-hidden="true"
  >
    {/* Top finial crown */}
    <path d="M24 4L30 15H18L24 4Z" fill="#C59A52" stroke="#8E6728" strokeWidth="0.9" />
    <circle cx="24" cy="21" r="6" fill="#E6CA93" stroke="#8E6728" strokeWidth="1" />
    <rect x="13" y="28" width="22" height="6" rx="2" fill="#C59A52" stroke="#8E6728" strokeWidth="0.9" />
    {/* Turned golden cylinder body */}
    <rect
      x="11"
      y="34"
      width="26"
      height="112"
      rx="5"
      fill="url(#goldRodGradientRefined)"
      stroke="#8E6728"
      strokeWidth="1"
    />
    <line x1="11" y1="48" x2="37" y2="48" stroke="#651E2B" strokeWidth="1.4" strokeOpacity="0.75" />
    <line x1="11" y1="132" x2="37" y2="132" stroke="#651E2B" strokeWidth="1.4" strokeOpacity="0.75" />
    <circle cx="24" cy="90" r="3.5" fill="#651E2B" fillOpacity="0.65" />
    {/* Bottom finial crown */}
    <rect x="13" y="146" width="22" height="6" rx="2" fill="#C59A52" stroke="#8E6728" strokeWidth="0.9" />
    <circle cx="24" cy="159" r="6" fill="#E6CA93" stroke="#8E6728" strokeWidth="1" />
    <path d="M24 176L30 165H18L24 176Z" fill="#C59A52" stroke="#8E6728" strokeWidth="0.9" />
    <defs>
      <linearGradient id="goldRodGradientRefined" x1="11" y1="90" x2="37" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B6323" />
        <stop offset="0.35" stopColor="#EDD39C" />
        <stop offset="0.7" stopColor="#C59A52" />
        <stop offset="1" stopColor="#7C561B" />
      </linearGradient>
    </defs>
  </svg>
);

export const JharokhaArchTop: React.FC<{className?: string}> = ({className = 'w-full h-12'}) => (
  <svg viewBox="0 0 400 56" fill="none" className={className} preserveAspectRatio="none" aria-hidden="true">
    <path
      data-draw-path
      d="M8 54C8 36 32 34 48 34C64 34 72 22 92 22C112 22 122 14 146 14C170 14 184 4 200 4C216 4 230 14 254 14C278 14 288 22 308 22C328 22 336 34 352 34C368 34 392 36 392 54"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="200" cy="4" r="2.5" fill="currentColor" />
  </svg>
);

export const EventMotifIllustration: React.FC<{
  motif: MotifType;
  className?: string;
}> = ({motif, className = 'w-14 h-14'}) => {
  switch (motif) {
    case 'kalash':
      return <WeddingSideElementLeft className={className} />;
    case 'haldi':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <path
            data-draw-path
            d="M16 44C16 56 26 64 40 64C54 64 64 56 64 44H16Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <ellipse data-draw-path cx="40" cy="44" rx="24" ry="5" stroke="currentColor" strokeWidth="1.3" />
          <path
            data-draw-path
            d="M40 20C44 26 44 33 40 37C36 33 36 26 40 20Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            data-draw-path
            d="M27 25C32 29 33 34 30 38C25 36 24 30 27 25Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            data-draw-path
            d="M53 25C48 29 47 34 50 38C55 36 56 30 53 25Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M26 64H54" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case 'mehendi':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <path
            data-draw-path
            d="M40 14C46 22 52 28 52 40C52 50 47 58 40 66C33 58 28 50 28 40C28 28 34 22 40 14Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle data-draw-path cx="40" cy="41" r="7" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="40" cy="41" r="2.2" fill="currentColor" />
          <path
            data-draw-path
            d="M24 44C18 39 16 32 19 26C24 29 27 35 28 42"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            data-draw-path
            d="M56 44C62 39 64 32 61 26C56 29 53 35 52 42"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case 'sangeet':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <circle data-draw-path cx="28" cy="54" r="11" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="28" cy="54" r="4" stroke="currentColor" strokeWidth="1" />
          <path data-draw-path d="M36 46L58 18" stroke="currentColor" strokeWidth="1.6" />
          <path
            data-draw-path
            d="M54 14L63 22M50 19L58 26"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            data-draw-path
            d="M49 52C54 48 61 48 64 53C60 58 53 59 49 52Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case 'mandap':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <path
            data-draw-path
            d="M14 26C22 18 32 14 40 10C48 14 58 18 66 26"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            data-draw-path
            d="M20 26V64M60 26V64M14 64H66"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            data-draw-path
            d="M20 34C27 39 33 39 40 34C47 39 53 39 60 34"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            data-draw-path
            d="M40 44C44 49 44 55 40 59C36 55 36 49 40 44Z"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path d="M32 60H48" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case 'reception':
    default:
      return <WeddingSideElementRight className={className} />;
  }
};
