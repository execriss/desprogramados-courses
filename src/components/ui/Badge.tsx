import '../../styles/components/badge.css';
import type { Course } from '../../types';

type CategoryVariant = Course['category'];
type LevelVariant = Course['level'];
type Variant = CategoryVariant | LevelVariant | 'tag';

interface BadgeProps {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge--${variant} ${className}`}>{children}</span>
  );
}
