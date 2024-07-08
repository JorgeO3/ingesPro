'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const IngesLogo: React.FC<Props> = ({
  className,
  height,
  width,
}: Props) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define the colors based on the theme
  const primaryColor = theme === 'dark' ? '#ffffff' : '#000000';
  const secondaryColor = '#4a73e8';

  if (!mounted) {
    // Render nothing on the server
    return null;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110.10064 91.474455"
      version="1.1"
      id="svg1"
      className={className}
    >
      <title>IngesPro Logo</title>
      <defs id="defs1" />
      <g id="layer1" transform="translate(-785.91449,-38.800358)">
        <g id="g2" transform="translate(276.47651,38.539045)">
          <path
            fill={primaryColor}
            d="m 590.15355,91.709359 15.13108,-23.823237 14.25401,23.849647 z"
            id="path10-5-6-0-1"
          />
          <path
            fill={primaryColor}
            d="m 592.62158,46.663222 -28.91911,45.068957 h 3.63987 10.65586 l 21.06219,-34.282567 z"
            id="path8-6-0-2-5"
          />
          <path
            fill={secondaryColor}
            d="m 563.72644,0.26138161 c -0.24217,-0.001 -0.48769,0.0385 -0.72637,0.12253 -0.46276,0.16282 -0.85136,0.47818 -1.09755,0.89064999 L 533.99924,48.022722 509.72165,88.694379 c -0.80595,1.35013 0.20144,3.03784 1.81326,3.0378 h 43.16779 l -2.69948,-0.0196 34.61023,-55.104127 0.73438,1.21832 -21.81878,-36.5522704 c -0.38096,-0.63826999 -1.07612,-1.00939999 -1.80261,-1.01318999 z m -3.13461,18.52433039 11.3263,18.44084 -25.34941,39.24466 -21.84274,0.10122 z"
            id="path7-2-6-3-5"
          />
        </g>
      </g>
    </svg>
  );
};
