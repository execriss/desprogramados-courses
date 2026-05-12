import { Award } from 'lucide-react';
import type { Course } from '../../types';

interface UserProgress {
  courseId: string;
  progressPercent: number;
  lastLessonTitle: string;
  enrolledAt: string;
  completedAt?: string;
}

interface CompletedCourseCardProps {
  course: Course;
  progress: UserProgress;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function CompletedCourseCard({ course, progress }: CompletedCourseCardProps) {
  return (
    <div className="completed-card">
      <div className="completed-card__thumb">
        <Award size={22} color="white" />
      </div>
      <div className="completed-card__body">
        <p className="completed-card__category">{course.category.toUpperCase()}</p>
        <p className="completed-card__title">{course.title}</p>
        {progress.completedAt && (
          <p className="completed-card__date">
            Completado el {formatDate(progress.completedAt)}
          </p>
        )}
        <button className="completed-card__cert" disabled>
          <Award size={13} />
          Ver certificado
        </button>
      </div>
    </div>
  );
}
