import { Skeleton } from '../ui/Skeleton';
import '../../styles/components/skeleton.css';

export function CourseCardSkeleton() {
  return (
    <div className="course-card-skeleton" aria-hidden="true">
      <Skeleton className="course-card-skeleton__thumb" />
      <div className="course-card-skeleton__body">
        <div className="course-card-skeleton__meta">
          <Skeleton width={64} height={20} pill />
          <Skeleton width={80} height={20} pill />
        </div>
        <Skeleton height={18} />
        <Skeleton height={18} width="72%" />
        <Skeleton height={14} width="48%" />
        <Skeleton height={13} width="68%" />
        <div className="course-card-skeleton__footer">
          <Skeleton width={56} height={18} />
          <Skeleton width={44} height={13} />
        </div>
      </div>
    </div>
  );
}
