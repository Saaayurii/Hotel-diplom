export function MapDecoration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Europe-Mediterranean inspired map shape */}
      <path
        d="M250,100 L280,120 L310,115 L340,130 L360,150 L380,160 L400,155 L420,170 L430,190 L425,210 L410,230 L395,250 L380,265 L365,275 L345,285 L325,295 L305,300 L285,295 L265,285 L250,270 L235,250 L225,230 L220,210 L225,190 L235,170 L245,150 L250,130 Z"
        fill="currentColor"
        opacity="0.15"
      />

      {/* Additional landmass */}
      <path
        d="M150,200 L180,210 L200,225 L210,245 L205,265 L190,280 L170,290 L150,285 L135,270 L130,250 L135,230 L145,215 Z"
        fill="currentColor"
        opacity="0.1"
      />

      {/* Island shapes */}
      <ellipse cx="320" cy="350" rx="30" ry="20" fill="currentColor" opacity="0.12" />
      <ellipse cx="280" cy="380" rx="20" ry="15" fill="currentColor" opacity="0.1" />
      <ellipse cx="350" cy="370" rx="25" ry="18" fill="currentColor" opacity="0.11" />

      {/* Decorative grid lines */}
      <line x1="100" y1="100" x2="500" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
      <line x1="100" y1="200" x2="500" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
      <line x1="100" y1="300" x2="500" y2="300" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
      <line x1="100" y1="400" x2="500" y2="400" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />

      <line x1="150" y1="50" x2="150" y2="450" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
      <line x1="250" y1="50" x2="250" y2="450" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
      <line x1="350" y1="50" x2="350" y2="450" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
      <line x1="450" y1="50" x2="450" y2="450" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="5,5" />
    </svg>
  );
}
