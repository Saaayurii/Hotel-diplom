export function CompassIcon({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* North indicator */}
      <path
        d="M50 10 L50 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="8"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
        fill="currentColor"
      >
        N
      </text>

      {/* Compass points */}
      <path
        d="M50 15 L55 50 L50 85 L45 50 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M85 50 L50 55 L15 50 L50 45 Z"
        fill="currentColor"
        opacity="0.2"
      />

      {/* Center point */}
      <circle
        cx="50"
        cy="50"
        r="3"
        fill="currentColor"
      />
    </svg>
  );
}
