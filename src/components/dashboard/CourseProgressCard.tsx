import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import type { Course } from '../../types';

interface UserProgress {
  courseId: string;
  progressPercent: number;
  lastLessonTitle: string;
  enrolledAt: string;
  completedAt?: string;
}

interface CourseProgressCardProps {
  course: Course;
  progress: UserProgress;
}

export function CourseProgressCard({ course, progress }: CourseProgressCardProps) {
  return (
    <div className="progress-card">
      <div className="progress-card__thumb">
        <Play size={20} fill="white" color="white" />
      </div>
      <div className="progress-card__body">
        <p className="progress-card__category">{course.category.toUpperCase()}</p>
        <p className="progress-card__title">{course.title}</p>
        <p className="progress-card__lesson">{progress.lastLessonTitle}</p>
        <div className="progress-card__bar-wrap">
          <div className="progress-card__bar">
            <div
              className="progress-card__bar-fill"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
          <span className="progress-card__percent">{progress.progressPercent}%</span>
        </div>
        <Link to={`/courses/${course.slug}/play`} className="progress-card__cta">
          Continuar →
        </Link>
      </div>
    </div>
  );
}
