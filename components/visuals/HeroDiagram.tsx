export function HeroDiagram() {
  return (
    <figure className="hero-art">
      <svg viewBox="0 0 560 520" role="img" aria-labelledby="system-title system-description">
        <title id="system-title">From fragmented inputs to a connected system</title>
        <desc id="system-description">A conceptual layered system. Separate inputs connect through an organized processing layer to a structured analytical output.</desc>
        <defs>
          <linearGradient id="plate" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#243244" /><stop offset="1" stopColor="#131d29" />
          </linearGradient>
          <linearGradient id="blue-plate" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#3165cb" stopOpacity=".4" /><stop offset="1" stopColor="#163156" stopOpacity=".12" />
          </linearGradient>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#677b93" opacity=".22" />
          </pattern>
        </defs>
        <rect width="560" height="520" fill="url(#dots)" />
        <g fill="none" stroke="#34465d" strokeWidth="1">
          <path d="m40 363 240 132 240-132M40 338l240 132 240-132" />
          <path d="M280 34v462M40 164v200M520 164v200" strokeDasharray="3 7" />
        </g>
        <g className="hero-layer">
          <path d="m55 322 225-123 225 123v18L280 463 55 340Z" fill="#162332" stroke="#425a75" />
          <path d="m55 322 225-123 225 123-225 123Z" fill="url(#plate)" stroke="#516b8c" />
          <g stroke="#456285" fill="none" opacity=".75">
            <path d="m100 322 180 98 180-98-180-98Z" />
            <path d="m145 298 180 98m-135-123 180 98m-135-123 180 98M145 347l180-99m-135 124 180-99m-135 124 180-99" />
          </g>
          <path d="m190 347 45-25 45 25 90-49" stroke="#8cb8ff" strokeWidth="2" fill="none" className="hero-flow" />
          <g fill="#8cb8ff"><circle cx="190" cy="347" r="4" /><circle cx="280" cy="347" r="4" /><circle cx="370" cy="298" r="4" /></g>
        </g>
        <g stroke="#82adf7" strokeWidth="1.4" fill="none" opacity=".85">
          <path d="M145 223v75m135-123v124m135-76v75" className="hero-flow" />
        </g>
        <g className="hero-layer hero-layer-two">
          <path d="m55 220 225-123 225 123v16L280 359 55 236Z" fill="#182c47" stroke="#537bb2" />
          <path d="m55 220 225-123 225 123-225 123Z" fill="url(#blue-plate)" stroke="#8cb8ff" strokeWidth="1.3" />
          <path d="m118 220 162-89 162 89-162 89Z" fill="#1a2e49" stroke="#44699c" />
          <path d="m145 220 135-74 135 74-135 74Z" stroke="#88b1f2" strokeDasharray="4 5" fill="none" opacity=".6" />
          <g fill="#17273d" stroke="#769dce">
            <path d="m190 220 45-25 45 25-45 25Z" />
            <path d="m280 220 45-25 45 25-45 25Z" />
            <path d="m235 195 45-25 45 25-45 25Z" />
          </g>
          <path d="m235 220 45-25 45 25" stroke="#bbd5ff" strokeWidth="2" fill="none" />
          <g fill="#c6ddff"><circle cx="235" cy="220" r="3" /><circle cx="280" cy="195" r="3" /><circle cx="325" cy="220" r="3" /></g>
        </g>
        <g className="hero-layer hero-layer-three">
          <g stroke="#7797c0" strokeWidth="1.3" fill="url(#plate)">
            <path d="m114 120 63-35 63 35v10l-63 35-63-35Z" />
            <path d="m256 74 63-35 63 35v10l-63 35-63-35Z" />
            <path d="m345 151 63-35 63 35v10l-63 35-63-35Z" />
          </g>
          <g fill="none" stroke="#9cbcea" strokeWidth="2">
            <path d="m147 117 29 16 32-18m-47-7 29 16m-15-24 29 16" />
            <path d="m291 79 16-9 16 9 18-10m-18 10v-22m-16 13V57m34 12V50" />
            <path d="m385 151 23-13 23 13-23 13Zm23-13v26" />
          </g>
          <path d="M177 165v42l58 32m84-120v36m89 41v40l-38 20" stroke="#8cb8ff" strokeWidth="1.5" fill="none" className="hero-flow" />
        </g>
        <g fill="#becde0" fontSize="12" fontFamily="monospace">
          <text x="30" y="79">01</text><text x="30" y="201">02</text><text x="30" y="305">03</text>
        </g>
        <g stroke="#8499b2"><path d="M27 88v22m0 100v22m0 82v22" /></g>
      </svg>
      <figcaption className="hero-art-caption">
        <span><span className="signal-dot" />INPUTS → SYSTEM → CLARITY</span>
        <span>CONCEPTUAL ARCHITECTURE</span>
      </figcaption>
    </figure>
  );
}
