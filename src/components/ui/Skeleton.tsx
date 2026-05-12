import '../../styles/components/skeleton.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  rounded?: boolean;
  pill?: boolean;
  circle?: boolean;
  style?: React.CSSProperties;
}

export function Skeleton({
  width,
  height,
  className = '',
  rounded,
  pill,
  circle,
  style,
}: SkeletonProps) {
  const modifiers = [
    rounded ? 'skeleton--rounded' : '',
    pill ? 'skeleton--pill' : '',
    circle ? 'skeleton--circle' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={`skeleton ${modifiers} ${className}`.trim()}
      aria-hidden="true"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  );
}
