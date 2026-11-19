import React, {useId} from 'react';

/**
 * Ornate royal Rajasthani cusped arch crown with draped marigold & jasmine
 * marriage toran (bandanwar) and delicate brass bells.
 */
export const MarriageArchCrown: React.FC<{className?: string}> = ({
  className = 'w-full h-auto',
}) => {
  const uid = useId().replace(/:/g, '');
  const goldGradId = `arch-gold-${uid}`;

  return (
    <svg
      viewBox="0 0 420 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={goldGradId} x1="0" y1="0" x2="420" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A67E43" />
          <stop offset="30%" stopColor="#E6CC9A" />
          <stop offset="50%" stopColor="#F5E4BE" />
          <stop offset="70%" stopColor="#E6CC9A" />
          <stop offset="100%" stopColor="#A67E43" />
        </linearGradient>
      </defs>

      {/* Top Temple Kalash / Lotus Finial */}
      <path
        d="M210 4C215 12 215 19 210 25C205 19 205 12 210 4Z"
        fill={`url(#${goldGradId})`}
      />
      <circle cx="210" cy="27" r="2.8" fill="#F5E4BE" />

      {/* Outer Architectural Scalloped Palace Arch */}
      <path
        d="M12 88V72C12 52 28 40 50 40C68 40 80 30 96 27C116 23 132 31 152 24C172 17 188 26 210 26C232 26 248 17 268 24C288 31 304 23 324 27C340 30 352 40 370 40C392 40 408 52 408 72V88"
        stroke={`url(#${goldGradId})`}
        strokeWidth="2.2"
        fill="#2A0B15"
        fillOpacity="0.88"
      />

      {/* Inner Filigree Cusped Arch Line */}
      <path
        d="M22 88V74C22 58 35 49 54 49C71 49 83 39 99 36C118 33 134 40 153 33C172 26 189 35 210 35C231 35 248 26 267 33C286 40 302 33 321 36C337 39 349 49 366 49C385 49 398 58 398 74V88"
        stroke="#C6A36A"
        strokeOpacity="0.65"
        strokeWidth="1.1"
      />

      {/* Left & Right Draped Toran (Marriage Garland) Swags */}
      <path
        d="M28 66C66 85 112 84 148 56C174 74 194 75 210 56C226 75 246 74 272 56C308 84 354 85 392 66"
        stroke="#C6A36A"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />

      {/* Subtle Marigold, Spun Gold & Crimson Garland Beads Along Toran */}
      {[
        {cx: 48, cy: 73, r: 3.4, fill: '#D99B38'},
        {cx: 68, cy: 78, r: 2.8, fill: '#E6C78E'},
        {cx: 88, cy: 79, r: 3.6, fill: '#8F2233'},
        {cx: 108, cy: 76, r: 2.8, fill: '#E6C78E'},
        {cx: 128, cy: 68, r: 3.4, fill: '#D99B38'},
        {cx: 168, cy: 66, r: 2.6, fill: '#E6C78E'},
        {cx: 184, cy: 70, r: 3.2, fill: '#D99B38'},
        {cx: 198, cy: 66, r: 2.6, fill: '#E6C78E'},
        {cx: 222, cy: 66, r: 2.6, fill: '#E6C78E'},
        {cx: 236, cy: 70, r: 3.2, fill: '#D99B38'},
        {cx: 252, cy: 66, r: 2.6, fill: '#E6C78E'},
        {cx: 292, cy: 68, r: 3.4, fill: '#D99B38'},
        {cx: 312, cy: 76, r: 2.8, fill: '#E6C78E'},
        {cx: 332, cy: 79, r: 3.6, fill: '#8F2233'},
        {cx: 352, cy: 78, r: 2.8, fill: '#E6C78E'},
        {cx: 372, cy: 73, r: 3.4, fill: '#D99B38'},
      ].map((bead, idx) => (
        <circle
          key={idx}
          cx={bead.cx}
          cy={bead.cy}
          r={bead.r}
          fill={bead.fill}
          stroke="#2A0B15"
          strokeWidth="0.6"
        />
      ))}

      {/* Tiny Hanging Brass Marriage Bells at Toran Peaks */}
      {[88, 210, 332].map((x) => (
        <g key={x}>
          <line x1={x} y1={x === 210 ? 58 : 80} x2={x} y2={x === 210 ? 70 : 88} stroke="#D9BD8B" strokeWidth="1" />
          <path
            d={`M${x - 4} ${x === 210 ? 75 : 91}H${x + 4}L${x + 2.5} ${x === 210 ? 69 : 86}H${x - 2.5}Z`}
            fill="#E6CC9A"
          />
        </g>
      ))}
    </svg>
  );
};

/**
 * Pierced-brass Rajasthani hanging palace lantern with soft candlelight glow.
 */
export const HangingPalaceLantern: React.FC<{className?: string}> = ({
  className = 'w-12 h-36',
}) => {
  const uid = useId().replace(/:/g, '');
  const glowId = `lantern-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 64 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="62%" r="48%">
          <stop offset="0%" stopColor="#FFE3A3" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#D99B38" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#D99B38" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hanging Chain */}
      <line x1="32" y1="0" x2="32" y2="64" stroke="#C6A36A" strokeOpacity="0.7" strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="32" cy="66" r="3" stroke="#D9BD8B" strokeWidth="1.2" />

      {/* Warm Ambient Aura */}
      <circle cx="32" cy="112" r="30" fill={`url(#${glowId})`} />

      {/* Lantern Dome */}
      <path
        d="M32 69C24 76 18 84 18 92H46C46 84 40 76 32 69Z"
        fill="#3A111D"
        stroke="#D9BD8B"
        strokeWidth="1.2"
      />

      {/* Lantern Pierced Chamber */}
      <path
        d="M20 92L16 128L32 142L48 128L44 92H20Z"
        fill="#2A0B15"
        fillOpacity="0.88"
        stroke="#D9BD8B"
        strokeWidth="1.3"
      />
      <path
        d="M25 96H39L41 124L32 133L23 124L25 96Z"
        fill="#F5C77E"
        fillOpacity="0.22"
        stroke="#C6A36A"
        strokeWidth="0.9"
      />

      {/* Glowing Diya Flame Inside */}
      <path
        d="M32 103C35 109 35.5 115 32 119C28.5 115 29 109 32 103Z"
        fill="#FFE7B3"
      />

      {/* Bottom Tassel Finial */}
      <line x1="32" y1="142" x2="32" y2="162" stroke="#D9BD8B" strokeWidth="1.2" />
      <circle cx="32" cy="164" r="2.2" fill="#D9BD8B" />
    </svg>
  );
};
