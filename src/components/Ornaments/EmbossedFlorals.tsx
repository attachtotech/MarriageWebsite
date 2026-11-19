import React, {useId} from 'react';

interface EmbossedFloralCornerProps {
  corner: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
  tone?: 'ivory' | 'dark';
}

/**
 * Sculpted blind-embossed botanical peony & vine corner ornament
 * with raised bevel highlight/shadow and subtle antique gold stem tracing.
 */
export const EmbossedFloralCorner: React.FC<EmbossedFloralCornerProps> = ({
  corner,
  className = 'w-28 h-36 sm:w-36 sm:h-44',
  tone = 'dark',
}) => {
  const uid = useId().replace(/:/g, '');
  const filterId = `emboss-${tone}-${uid}`;

  const flipMap = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-[-1]',
  };

  const fillBase = tone === 'ivory' ? '#F6EFE4' : '#3E1522';
  const highlightStroke = tone === 'ivory' ? '#FFFFFF' : '#6F2E43';
  const shadowStroke = tone === 'ivory' ? '#D6C8B6' : '#18080E';
  const goldAccent = tone === 'ivory' ? '#C59A52' : '#C59A52';

  return (
    <svg
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${flipMap[corner]} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow
            dx="-1.1"
            dy="-1.1"
            stdDeviation="0.95"
            floodColor={highlightStroke}
            floodOpacity="0.88"
          />
          <feDropShadow
            dx="1.6"
            dy="2.1"
            stdDeviation="1.7"
            floodColor={shadowStroke}
            floodOpacity="0.82"
          />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {/* Sweeping Embossed Border Stem along top & left edge */}
        <path
          d="M14 196C14 134 15 88 26 52C36 22 68 14 162 14"
          stroke={goldAccent}
          strokeOpacity="0.38"
          strokeWidth="1.1"
        />

        {/* Botanical Peony Blossom (Top-Left Focal Relief) */}
        <path
          d="M46 42C36 30 43 16 58 22C68 26 70 40 58 49C52 54 49 46 46 42Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.9"
        />
        <path
          d="M32 54C22 48 24 31 39 32C50 33 54 45 48 56C43 64 36 57 32 54Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.9"
        />
        <path
          d="M54 62C46 72 30 68 32 54C34 45 47 44 57 52C62 56 57 60 54 62Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.9"
        />
        <path
          d="M66 44C78 40 84 54 71 63C62 69 52 63 54 51C56 45 62 45 66 44Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.9"
        />
        <circle cx="52" cy="46" r="10" fill={fillBase} stroke={shadowStroke} strokeWidth="0.85" />
        <circle
          cx="52"
          cy="46"
          r="4.5"
          fill={fillBase}
          stroke={goldAccent}
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />

        {/* Secondary Blossom */}
        <path
          d="M84 26C90 16 105 18 104 30C103 39 92 43 85 35C82 32 83 28 84 26Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.85"
        />
        <circle cx="94" cy="29" r="3.5" fill={fillBase} stroke={shadowStroke} strokeWidth="0.75" />

        {/* Sweeping Sculpted Leaves along Top */}
        <path
          d="M104 22C116 16 128 20 135 28C123 31 112 29 104 22Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.85"
        />
        <path
          d="M132 18C144 13 155 16 160 22C149 25 139 24 132 18Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.8"
        />
        <path
          d="M74 42C86 44 96 52 99 63C87 60 78 52 74 42Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.85"
        />

        {/* Sweeping Sculpted Leaves & Buds Down Left Edge */}
        <path
          d="M28 74C18 84 18 99 27 109C34 99 35 85 28 74Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.85"
        />
        <path
          d="M42 74C52 80 56 93 50 104C41 96 38 84 42 74Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.85"
        />
        <path
          d="M22 118C14 128 15 141 24 148C30 138 30 126 22 118Z"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.8"
        />
        <ellipse
          cx="32"
          cy="158"
          rx="4.5"
          ry="7"
          transform="rotate(-18 32 158)"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.8"
        />
        <ellipse
          cx="22"
          cy="178"
          rx="3.5"
          ry="5.5"
          transform="rotate(10 22 178)"
          fill={fillBase}
          stroke={shadowStroke}
          strokeWidth="0.75"
        />
        <circle cx="118" cy="36" r="2.8" fill={goldAccent} fillOpacity="0.4" />
        <circle cx="62" cy="78" r="2.6" fill={goldAccent} fillOpacity="0.4" />
      </g>
    </svg>
  );
};
