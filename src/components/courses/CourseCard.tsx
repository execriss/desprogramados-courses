import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, BookOpen } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatPrice, formatDuration, formatStudentCount } from '../../utils/formatters';
import type { Course } from '../../types';
import '../../styles/components/course-card.css';

interface CourseCardProps {
  course: Course;
}

const CATEGORY_LABELS: Record<Course['category'], string> = {
  react: 'React',
  node: 'Node.js',
  python: 'Python',
  vue: 'Vue',
  angular: 'Angular',
  nest: 'NestJS',
  go: 'Go',
  java: 'Java',
};

const LEVEL_LABELS: Record<Course['level'], string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.article
      className="course-card"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <Link to={`/courses/${course.slug}`} className="course-card__link">
        <div className="course-card__thumbnail">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} loading="lazy" />
          ) : (
            <div className="course-card__thumbnail-placeholder">
              <BookOpen size={36} className="course-card__thumbnail-icon" />
            </div>
          )}
        </div>

        <div className="course-card__body">
          <div className="course-card__meta">
            <Badge variant={course.category}>{CATEGORY_LABELS[course.category]}</Badge>
            <Badge variant={course.level}>{LEVEL_LABELS[course.level]}</Badge>
          </div>

          <h3 className="course-card__title">{course.title}</h3>

          {course.instructorName && (
            <p className="course-card__instructor">{course.instructorName}</p>
          )}

          <div className="course-card__stats">
            <span className="course-card__rating">
              <Star size={13} fill="currentColor" />
              {course.rating.toFixed(1)}
              <span className="course-card__rating-count">
                ({formatStudentCount(course.studentsCount)})
              </span>
            </span>
            <span className="course-card__stat-item">
              <Clock size={13} />
              {formatDuration(course.durationHours)}
            </span>
          </div>

          <div className="course-card__footer">
            <span className={`course-card__price${course.price === 0 ? ' course-card__price--free' : ''}`}>
              {formatPrice(course.price)}
            </span>
            <span className="course-card__duration">
              {course.lessonsCount} lecciones
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
