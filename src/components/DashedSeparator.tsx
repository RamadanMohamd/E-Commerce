interface DashedSeparatorProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  dashArray?: string;
}

export function DashedSeparator({ 
  className = '', 
  color = '#A3A3A3',
  strokeWidth = 0.5,
  dashArray = '6 6'
}: DashedSeparatorProps) {
  return (
    <svg 
      width="100%" 
      height="1" 
      viewBox="0 0 1201 1" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path 
        d="M1200.25 0.25L0.250027 0.250105" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeDasharray={dashArray}
      />
    </svg>
  );
}

export default DashedSeparator;
