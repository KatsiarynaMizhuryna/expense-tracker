import React from 'react';

interface IconProps {
  width?: string | number;
  height?: string | number;
  fill?: string;
  viewBox?: string;
  d: string;
}

const Icon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  d
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path d={d} />
    </svg>
  );
};

export default Icon;
