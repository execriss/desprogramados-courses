import { Skeleton } from '../ui/Skeleton';
import '../../styles/components/skeleton.css';

export function CourseDetailSkeleton() {
  return (
    <div aria-hidden="true">
      {/* Hero */}
      <div className="course-detail-skeleton__hero">
        <div className="course-detail-skeleton__hero-inner">
          <div>
            <div className="course-detail-skeleton__meta">
              <Skeleton width={72} height={22} pill />
              <Skeleton width={88} height={22} pill />
            </div>
            <div className="course-detail-skeleton__lines">
              <Skeleton height={36} width="90%" />
              <Skeleton height={36} width="65%" />
            </div>
            <div className="course-detail-skeleton__lines">
              <Skeleton height={16} />
              <Skeleton height={16} width="85%" />
              <Skeleton height={16} width="60%" />
            </div>
            <div className="course-detail-skeleton__stats">
              <Skeleton width={120} height={14} />
              <Skeleton width={80} height={14} />
              <Skeleton width={96} height={14} />
            </div>
          </div>
          <div className="course-detail-skeleton__sidebar">
            <Skeleton height={180} rounded />
            <Skeleton height={44} rounded />
            <Skeleton height={40} rounded />
            <Skeleton height={14} width="80%" />
            <Skeleton height={14} width="65%" />
            <Skeleton height={14} width="70%" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="course-detail-skeleton__body">
        <div className="course-detail-skeleton__section">
          <Skeleton width={160} height={22} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={18} width={`${60 + (i % 3) * 15}%`} />
            ))}
          </div>
        </div>

        <div className="course-detail-skeleton__section">
          <Skeleton width={140} height={22} />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="course-detail-skeleton__accordion-row">
              <Skeleton width={`${45 + i * 8}%`} height={16} />
              <Skeleton width={16} height={16} circle />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
