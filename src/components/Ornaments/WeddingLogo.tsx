import React, {useId} from 'react';
import {weddingConfig} from '../../data/weddingConfig';

interface WeddingLogoProps {
  variant?: 'light' | 'dark' | 'champagne';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Bespoke Indian luxury wedding calligraphy monogram logo.
 * Renders an ornate intertwined calligraphic crest (initials + filigree flourishes)
 * without displaying full text names.
 */
export const WeddingLogo: React.FC<WeddingLogoProps> = ({
  variant = 'champagne',
  size = 'md',
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const gradId = `monogram-grad-${uid}`;

  const brideInitial = weddingConfig.brideName.trim().charAt(0).toUpperCase() || 'A';
  const groomInitial = weddingConfig.groomName.trim().charAt(0).toUpperCase() || 'V';

  const accentStroke =
    variant === 'light'
      ? '#D9BD8B'
      : variant === 'dark'
        ? '#C6A36A'
        : '#E8D2A6';

  const primaryStroke =
    variant === 'light'
      ? '#F4E9D5'
      : variant === 'dark'
        ? '#30121D'
        : '#D9BD8B';

  const gradStops =
    variant === 'dark'
      ? {start: '#421724', mid: '#8C6833', end: '#30121D'}
      : {start: '#F7F0E5', mid: '#E3CA9C', end: '#C6A36A'};

  const sizeClass =
    size === 'xs'
      ? 'w-11 h-8 sm:w-12 sm:h-9'
      : size === 'sm'
        ? 'w-14 h-10 sm:w-16 sm:h-11'
        : size === 'md'
          ? 'w-24 h-16 sm:w-28 sm:h-18'
          : size === 'lg'
            ? 'w-32 h-22 sm:w-40 sm:h-26'
            : 'w-40 h-26 sm:w-52 sm:h-34';

  return (
    <span
      role="img"
      aria-label={`${weddingConfig.brideName} and ${weddingConfig.groomName} calligraphy monogram logo`}
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 220 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${sizeClass}`}
      >
        <defs>
          <linearGradient id={gradId} x1="28" y1="14" x2="192" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={gradStops.start} />
            <stop offset="48%" stopColor={gradStops.mid} />
            <stop offset="100%" stopColor={gradStops.end} />
          </linearGradient>
        </defs>

        {/* Top Crown Lotus Bud & Flanking Calligraphic Hairlines */}
        <path
          d="M110 10C114 16 114 22 110 27C106 22 106 16 110 10Z"
          stroke={accentStroke}
          strokeWidth="1.25"
          fill={accentStroke}
          fillOpacity="0.24"
        />
        <path
          d="M101 23C104 18 107 18 110 24C113 18 116 18 119 23"
          stroke={accentStroke}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M62 25C78 18 94 19 105 26M158 25C142 18 126 19 115 26"
          stroke={accentStroke}
          strokeWidth="1.05"
          strokeLinecap="round"
        />

        {/* Delicate Outer Beaded & Hairline Royal Frame */}
        <ellipse
          cx="110"
          cy="73"
          rx="68"
          ry="45"
          stroke={accentStroke}
          strokeOpacity="0.45"
          strokeWidth="0.9"
          strokeDasharray="2.5 3"
        />
        <ellipse
          cx="110"
          cy="73"
          rx="61"
          ry="39"
          stroke={accentStroke}
          strokeOpacity="0.72"
          strokeWidth="1.15"
        />

        {/* Left & Right Symmetrical Calligraphic Vine Flourishes */}
        <path
          d="M41 73C26 73 20 60 28 52C34 46 43 52 39 59C36 63 30 62 31 57"
          stroke={accentStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M41 73C26 73 20 86 28 94C34 100 43 94 39 87C36 83 30 84 31 89"
          stroke={accentStroke}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M179 73C194 73 200 60 192 52C186 46 177 52 181 59C184 63 190 62 189 57"
          stroke={accentStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M179 73C194 73 200 86 192 94C186 100 177 94 181 87C184 83 190 84 189 89"
          stroke={accentStroke}
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Intertwined Pointed-Pen Calligraphic Initials */}
        <text
          x="83"
          y="91"
          textAnchor="middle"
          fill={`url(#${gradId})`}
          style={{fontFamily: 'var(--font-script)'}}
          fontSize="60"
        >
          {brideInitial}
        </text>
        <text
          x="137"
          y="91"
          textAnchor="middle"
          fill={`url(#${gradId})`}
          style={{fontFamily: 'var(--font-script)'}}
          fontSize="60"
        >
          {groomInitial}
        </text>

        {/* Central Interlacing Ampersand & Calligraphic Swash */}
        <path
          d="M102 68C106 58 116 58 118 67C120 76 101 84 97 74C94 68 100 63 106 65"
          stroke={primaryStroke}
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Sweeping Bottom Pointed-Pen Calligraphic Flourish */}
        <path
          d="M54 123C74 133 146 133 166 123"
          stroke={accentStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M84 129C98 136 122 136 136 129"
          stroke={primaryStroke}
          strokeOpacity="0.55"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <circle cx="110" cy="130" r="2.2" fill={accentStroke} />
      </svg>
    </span>
  );
};
