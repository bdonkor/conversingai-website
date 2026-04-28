

export const LivingAICore = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full h-full bg-[#020617] flex items-center justify-center overflow-hidden rounded-[32px] ${className}`}>
      {/* Background Glow */}
      <div className="absolute w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />

      {/* Core SVG */}
      <svg
        viewBox="0 0 400 400"
        className="relative z-10 w-[70%] h-[70%]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Orbiting Rings */}
        <g className="animate-spin-slow origin-center">
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="url(#coreGradient)"
            strokeWidth="0.5"
            strokeDasharray="10 20"
            strokeOpacity="0.3"
          />
          <circle
            cx="360"
            cy="200"
            r="4"
            fill="#60a5fa"
          >
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        <g className="animate-spin-reverse-slow origin-center">
          <circle
            cx="200"
            cy="200"
            r="130"
            stroke="#8b5cf6"
            strokeWidth="0.5"
            strokeDasharray="5 15"
            strokeOpacity="0.3"
          />
          <circle
            cx="70"
            cy="200"
            r="3"
            fill="#a78bfa"
          >
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Neural Grid Connections */}
        <g opacity="0.2" stroke="#60a5fa" strokeWidth="0.5">
          <line x1="200" y1="100" x2="200" y2="300" />
          <line x1="100" y1="200" x2="300" y2="200" />
          <line x1="130" y1="130" x2="270" y2="270" />
          <line x1="130" y1="270" x2="270" y2="130" />
        </g>

        {/* Central Intelligence Core */}
        <g filter="url(#glow)">
          <circle
            cx="200"
            cy="200"
            r="60"
            fill="url(#innerGlow)"
            className="animate-pulse"
          />

          <circle
            cx="200"
            cy="200"
            r="40"
            stroke="url(#coreGradient)"
            strokeWidth="2"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 251.2;251.2 0;0 251.2"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Core Geometric Shape */}
          <path
            d="M200 170L226 185V215L200 230L174 215V185L200 170Z"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Floating Data Nodes */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const x = 200 + Math.cos(angle) * 100;
          const y = 200 + Math.sin(angle) * 100;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="#60a5fa"
            >
              <animate
                attributeName="r"
                values="1;3;1"
                dur={`${2 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>

      {/* Text Label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="text-blue-400/50 text-[10px] uppercase tracking-[0.2em] font-medium mb-1">
          Active AI Session
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
      `}} />
    </div>
  );
};
