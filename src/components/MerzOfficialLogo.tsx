import React from 'react';

interface MerzAgencyLogoProps {
  size?: string;
  className?: string;
}

/**
 * Exact replica of the MERZ Security Solutions Agency Inc. Official Emblem
 * Modeled directly from the official agency crest photo:
 * - Distinctive heater shield with top dip and corner ears
 * - Triple-layer border: bold outer black, white channel, inner black frame
 * - Arched top typography: "Security Solutions Agency" with "Inc." underneath
 * - 3 golden stars flanking on each side
 * - Radiant Philippine 8-ray golden sunburst
 * - Split lower field: Philippine Royal Blue (left) and Philippine Red (right)
 * - Majestic Philippine Eagle with outstretched layered golden-brown wings, crest & hooked beak
 * - Solid black ornamental cartouche with gold-beveled border and bold gold "MERZ" lettering
 * - Twin curved golden laurel leaf branches meeting at the bottom shield point
 */
export const MerzAgencyLogo: React.FC<MerzAgencyLogoProps> = ({ 
  size = "w-14 h-14", 
  className = "" 
}) => {
  return (
    <div className={`relative ${size} shrink-0 inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
        role="img"
        aria-label="MERZ Security Solutions Agency Inc. Official Logo"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="goldMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          <linearGradient id="merzGoldLetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="35%" stopColor="#fde047" />
            <stop offset="70%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="eagleWingLeft" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#c27803" />
            <stop offset="60%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#291102" />
          </linearGradient>

          <linearGradient id="eagleWingRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#c27803" />
            <stop offset="60%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#291102" />
          </linearGradient>

          <linearGradient id="eagleChestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="25%" stopColor="#fde68a" />
            <stop offset="55%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Text arc path matching exact shield curvature */}
          <path
            id="textArcCurve"
            d="M 52 108 C 110 52 290 52 348 108"
            fill="transparent"
          />

          {/* Exact Shield Shape Clipping Mask */}
          <clipPath id="innerShieldClip">
            <path d="M 200 54 C 255 24 330 30 354 68 C 372 178 300 326 200 398 C 100 326 28 178 46 68 C 70 30 145 24 200 54 Z" />
          </clipPath>

          {/* Drop shadow filter */}
          <filter id="plaqueGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. OUTER SHIELD FRAME */}
        {/* Outer Heavy Black Rim */}
        <path
          d="M 200 44 C 262 12 344 18 370 60 C 390 186 312 346 200 424 C 88 346 10 186 30 60 C 56 18 138 12 200 44 Z"
          fill="#0a0a0a"
        />

        {/* Middle White Gap Channel */}
        <path
          d="M 200 50 C 258 20 336 26 360 65 C 378 182 304 334 200 408 C 96 334 22 182 40 65 C 64 26 142 20 200 50 Z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* Inner Black Border Line */}
        <path
          d="M 200 54 C 255 24 330 30 354 68 C 372 178 300 326 200 398 C 100 326 28 178 46 68 C 70 30 145 24 200 54 Z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="3"
        />

        {/* 2. INNER SHIELD CONTENT (Clipped to inside) */}
        <g clipPath="url(#innerShieldClip)">
          {/* Top White Area behind arch and sun */}
          <rect x="0" y="0" width="400" height="220" fill="#ffffff" />

          {/* Lower Left Field: Philippine Royal Blue */}
          <path
            d="M 200 130 L 200 420 L 20 420 L 20 130 Z"
            fill="#0b45a6"
          />

          {/* Lower Right Field: Philippine Deep Red */}
          <path
            d="M 200 130 L 200 420 L 380 420 L 380 130 Z"
            fill="#ce1126"
          />

          {/* Center Vertical Divider Line in Lower Flag Field */}
          <line x1="200" y1="130" x2="200" y2="400" stroke="#000000" strokeWidth="2.5" />

          {/* 3. PHILIPPINE 8-RAYED GOLDEN SUNBURST */}
          <g transform="translate(200, 150)">
            {/* 8 Primary Ray Clusters */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={`sun-${i}`} transform={`rotate(${angle})`}>
                {/* Center long ray */}
                <polygon
                  points="0,-86 -8,-36 8,-36"
                  fill="#f59e0b"
                  stroke="#b45309"
                  strokeWidth="0.8"
                />
                <polygon
                  points="0,-82 -4,-36 4,-36"
                  fill="#fef08a"
                />
                {/* Left side flanking ray */}
                <polygon
                  points="-13,-72 -15,-36 -8,-36"
                  fill="#f59e0b"
                />
                {/* Right side flanking ray */}
                <polygon
                  points="13,-72 8,-36 15,-36"
                  fill="#f59e0b"
                />
              </g>
            ))}

            {/* Central Radiant Sun Disc */}
            <circle cx="0" cy="0" r="42" fill="url(#sunGlow)" stroke="#b45309" strokeWidth="2" />
            <circle cx="0" cy="0" r="36" fill="#fbbf24" />
          </g>

          {/* 4. GOLDEN STARS (3 stars on left curve, 3 stars on right curve) */}
          {/* Left Stars */}
          {[
            { x: 58, y: 104, s: 0.65 },
            { x: 78, y: 84, s: 0.65 },
            { x: 104, y: 68, s: 0.65 }
          ].map((star, idx) => (
            <g key={`star-l-${idx}`} transform={`translate(${star.x}, ${star.y}) scale(${star.s})`}>
              <polygon
                points="0,-16 4.5,-4.5 16,-4.5 7,3.5 10.5,15 0,8 -10.5,15 -7,3.5 -16,-4.5 -4.5,-4.5"
                fill="#facc15"
                stroke="#b45309"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Right Stars */}
          {[
            { x: 342, y: 104, s: 0.65 },
            { x: 322, y: 84, s: 0.65 },
            { x: 296, y: 68, s: 0.65 }
          ].map((star, idx) => (
            <g key={`star-r-${idx}`} transform={`translate(${star.x}, ${star.y}) scale(${star.s})`}>
              <polygon
                points="0,-16 4.5,-4.5 16,-4.5 7,3.5 10.5,15 0,8 -10.5,15 -7,3.5 -16,-4.5 -4.5,-4.5"
                fill="#facc15"
                stroke="#b45309"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* 5. TOP CURVED TEXT: "Security Solutions Agency" */}
          {/* Shadow/Outline Layer for 3D effect */}
          <text
            className="select-none"
            style={{ fontWeight: 900 }}
            fill="#334155"
            dx="0"
            dy="1.5"
          >
            <textPath
              href="#textArcCurve"
              startOffset="50%"
              textAnchor="middle"
              fontSize="20"
              fontWeight="900"
              fontFamily="Arial, 'Plus Jakarta Sans', sans-serif"
              letterSpacing="0.4px"
            >
              Security Solutions Agency
            </textPath>
          </text>
          <text
            className="select-none"
            style={{ fontWeight: 900 }}
            fill="#090d16"
          >
            <textPath
              href="#textArcCurve"
              startOffset="50%"
              textAnchor="middle"
              fontSize="20"
              fontWeight="900"
              fontFamily="Arial, 'Plus Jakarta Sans', sans-serif"
              letterSpacing="0.4px"
            >
              Security Solutions Agency
            </textPath>
          </text>

          {/* "Inc." centered directly beneath the arc */}
          <text
            x="200"
            y="94"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fontFamily="Arial, 'Plus Jakarta Sans', sans-serif"
            fill="#090d16"
            className="select-none"
          >
            Inc.
          </text>

          {/* 6. MAJESTIC OUTSTRETCHED EAGLE */}
          <g transform="translate(200, 192)">
            {/* Left Wing (Flight feathers fanning out and upwards) */}
            <g>
              {/* Dark Base Flight Wing Shape */}
              <path
                d="M -25 -5 C -75 -75 -125 -65 -148 -15 C -156 12 -125 50 -45 58 Z"
                fill="url(#eagleWingLeft)"
                stroke="#1c0b02"
                strokeWidth="1.8"
              />
              {/* Secondary Tier Feathers */}
              <path
                d="M -30 -10 C -70 -60 -115 -50 -135 -10 C -142 12 -110 40 -45 46 Z"
                fill="#b45309"
                stroke="#451a03"
                strokeWidth="1"
              />
              {/* Top Covert Feathers (Golden Ochre) */}
              <path
                d="M -25 -15 C -55 -45 -90 -35 -105 -5 C -110 12 -80 30 -35 32 Z"
                fill="#d97706"
              />
              {/* Individual feather tips / separation lines */}
              {[-65, -45, -25, -5, 15, 35].map((y, idx) => (
                <path
                  key={`wf-l-${idx}`}
                  d={`M ${-142 + idx * 9} ${y} Q ${-95 + idx * 10} ${y + 12} ${-40 + idx * 4} ${y + 18}`}
                  stroke="#fbbf24"
                  strokeWidth="1.8"
                  fill="none"
                />
              ))}
            </g>

            {/* Right Wing (Flight feathers fanning out and upwards) */}
            <g>
              {/* Dark Base Flight Wing Shape */}
              <path
                d="M 25 -5 C 75 -75 125 -65 148 -15 C 156 12 125 50 45 58 Z"
                fill="url(#eagleWingRight)"
                stroke="#1c0b02"
                strokeWidth="1.8"
              />
              {/* Secondary Tier Feathers */}
              <path
                d="M 30 -10 C 70 -60 115 -50 135 -10 C 142 12 110 40 45 46 Z"
                fill="#b45309"
                stroke="#451a03"
                strokeWidth="1"
              />
              {/* Top Covert Feathers (Golden Ochre) */}
              <path
                d="M 25 -15 C 55 -45 90 -35 105 -5 C 110 12 80 30 35 32 Z"
                fill="#d97706"
              />
              {/* Individual feather tips / separation lines */}
              {[-65, -45, -25, -5, 15, 35].map((y, idx) => (
                <path
                  key={`wf-r-${idx}`}
                  d={`M ${142 - idx * 9} ${y} Q ${95 - idx * 10} ${y + 12} ${40 - idx * 4} ${y + 18}`}
                  stroke="#fbbf24"
                  strokeWidth="1.8"
                  fill="none"
                />
              ))}
            </g>

            {/* Eagle Tail Feathers (Fanning downwards below MERZ plaque) */}
            <g transform="translate(0, 80)">
              <polygon points="0,75 -26,18 26,18" fill="#78350f" stroke="#291102" strokeWidth="1.2" />
              <polygon points="-14,70 -38,15 -10,15" fill="#92400e" stroke="#291102" strokeWidth="1" />
              <polygon points="14,70 10,15 38,15" fill="#92400e" stroke="#291102" strokeWidth="1" />
              {/* Tail gold highlights */}
              <line x1="0" y1="18" x2="0" y2="70" stroke="#fbbf24" strokeWidth="2" />
              <line x1="-12" y1="18" x2="-8" y2="65" stroke="#fbbf24" strokeWidth="1.5" />
              <line x1="12" y1="18" x2="8" y2="65" stroke="#fbbf24" strokeWidth="1.5" />
            </g>

            {/* Eagle Body & Breast */}
            <path
              d="M 0 68 C -26 52 -34 16 -24 -24 C -14 -55 14 -55 24 -24 C 34 16 26 52 0 68 Z"
              fill="url(#eagleChestGrad)"
              stroke="#291102"
              strokeWidth="2"
            />
            {/* Plumage texture arches */}
            {[-12, 6, 24, 42].map((y, idx) => (
              <path
                key={`plume-${idx}`}
                d={`M ${-16 + idx * 2} ${y} Q 0 ${y + 7} ${16 - idx * 2} ${y}`}
                stroke="#78350f"
                strokeWidth="1.4"
                fill="none"
              />
            ))}

            {/* Eagle Head & Golden Crest */}
            <g transform="translate(0, -22)">
              {/* Spiky Crest Feathers on Top */}
              <path
                d="M -16 -10 L -8 -26 L 0 -18 L 8 -26 L 16 -10 Z"
                fill="#fbbf24"
                stroke="#78350f"
                strokeWidth="1.2"
              />
              {/* Crown & Forehead */}
              <ellipse cx="0" cy="-6" rx="14" ry="16" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
              <path d="M -14 -6 Q 0 8 14 -6 L 0 8 Z" fill="#fef3c7" />

              {/* Fierce Eyes */}
              <ellipse cx="-6" cy="-8" rx="2.5" ry="3.2" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
              <circle cx="-5.5" cy="-8" r="1.5" fill="#090d16" />
              
              <ellipse cx="6" cy="-8" rx="2.5" ry="3.2" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
              <circle cx="5.5" cy="-8" r="1.5" fill="#090d16" />

              {/* Golden Hooked Beak */}
              <path
                d="M -5 -4 L 0 16 L 5 -4 Q 0 -1 -5 -4 Z"
                fill="#f59e0b"
                stroke="#78350f"
                strokeWidth="1.2"
              />
              <path d="M -1 0 L 0 16 L 1 0 Z" fill="#fde047" />
            </g>

            {/* Talons grasping the top of the plaque */}
            <g transform="translate(0, 52)">
              <circle cx="-20" cy="4" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              <circle cx="-14" cy="6" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              <circle cx="20" cy="4" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              <circle cx="14" cy="6" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
            </g>
          </g>

          {/* 7. CENTRAL ORNATE "MERZ" CARTOUCHE BANNER */}
          <g transform="translate(200, 274)" filter="url(#plaqueGlow)">
            {/* Outer Gold Border Plaque with Notched Brackets */}
            <path
              d="M -78 -18 
                 L 78 -18 
                 C 84 -18 88 -14 88 -8 
                 C 84 -4 84 4 88 8 
                 C 88 14 84 18 78 18 
                 L -78 18 
                 C -84 18 -88 14 -88 8 
                 C -84 4 -84 -4 -88 -8 
                 C -88 -14 -84 -18 -78 -18 Z"
              fill="url(#goldMetallicGrad)"
              stroke="#451a03"
              strokeWidth="2"
            />

            {/* Inner Black Onyx Field */}
            <path
              d="M -74 -14 
                 L 74 -14 
                 C 79 -14 83 -11 83 -6 
                 C 80 -3 80 3 83 6 
                 C 83 11 79 14 74 14 
                 L -74 14 
                 C -79 14 -83 11 -83 6 
                 C -80 3 -80 -3 -83 -6 
                 C -83 -11 -79 -14 -74 -14 Z"
              fill="#090d16"
            />

            {/* Inner Gold Thin Inset Line */}
            <path
              d="M -71 -12 L 71 -12 C 75 -12 78 -9 78 -5 L 78 5 C 78 9 75 12 71 12 L -71 12 C -75 12 -78 9 -78 5 L -78 -5 C -78 -9 -75 -12 -71 -12 Z"
              fill="none"
              stroke="url(#goldMetallicGrad)"
              strokeWidth="0.8"
            />

            {/* Bold Golden "MERZ" Lettering */}
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fontFamily="'Arial Black', Impact, 'Plus Jakarta Sans', sans-serif"
              fontSize="24"
              fontWeight="900"
              letterSpacing="3px"
              fill="url(#merzGoldLetterGrad)"
              stroke="#000000"
              strokeWidth="0.8"
              className="select-none"
            >
              MERZ
            </text>
          </g>

          {/* 8. GOLDEN LAUREL WREATH (Curving upward from the bottom shield point) */}
          <g transform="translate(200, 362)">
            {/* Left Laurel Branch Stem */}
            <path
              d="M -12 30 C -65 24 -115 -15 -124 -65"
              stroke="#eab308"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Laurel Leaves */}
            {[
              { x: -24, y: 28, r: 15 },
              { x: -48, y: 22, r: 35 },
              { x: -72, y: 12, r: 50 },
              { x: -94, y: -4, r: 70 },
              { x: -110, y: -24, r: 90 },
              { x: -120, y: -48, r: 105 },
            ].map((leaf, idx) => (
              <g key={`leaf-l-${idx}`} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r})`}>
                <ellipse
                  cx="0"
                  cy="0"
                  rx="10.5"
                  ry="5.5"
                  fill="#fbbf24"
                  stroke="#a16207"
                  strokeWidth="1"
                />
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#fef08a" strokeWidth="1" />
              </g>
            ))}

            {/* Right Laurel Branch Stem */}
            <path
              d="M 12 30 C 65 24 115 -15 124 -65"
              stroke="#eab308"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Laurel Leaves */}
            {[
              { x: 24, y: 28, r: -15 },
              { x: 48, y: 22, r: -35 },
              { x: 72, y: 12, r: -50 },
              { x: 94, y: -4, r: -70 },
              { x: 110, y: -24, r: -90 },
              { x: 120, y: -48, r: -105 },
            ].map((leaf, idx) => (
              <g key={`leaf-r-${idx}`} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r})`}>
                <ellipse
                  cx="0"
                  cy="0"
                  rx="10.5"
                  ry="5.5"
                  fill="#fbbf24"
                  stroke="#a16207"
                  strokeWidth="1"
                />
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#fef08a" strokeWidth="1" />
              </g>
            ))}

            {/* Bottom Tie Bow */}
            <circle cx="0" cy="30" r="4.5" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />
          </g>
        </g>

        {/* Outer Highlight Rim Line */}
        <path
          d="M 200 54 C 255 24 330 30 354 68 C 372 178 300 326 200 398 C 100 326 28 178 46 68 C 70 30 145 24 200 54 Z"
          fill="none"
          stroke="#000000"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};
