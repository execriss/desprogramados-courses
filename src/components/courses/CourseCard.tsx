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

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.article
      className="course-card"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <Link to={`/courses/${course.slug}`} style={{ display: 'contents' }}>
        <div className="course-card__thumbnail">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} loading="lazy" />
          ) : (
            <div className="course-card__thumbnail-placeholder">
              <BookOpen size={40} className="course-card__thumbnail-icon" />
            </div>
          )}
        </div>

        <div className="course-card__body">
          <div className="course-card__meta">
            <Badge variant={course.category}>{CATEGORY_LABELS[course.category]}</Badge>
            <Badge variant={course.level}>{course.level}</Badge>
          </div>

          <h3 className="course-card__title">{course.title}</h3>

          <p className="course-card__instructor">{course.instructor}</p>

          <div className="course-card__stats">
            <span className="course-card__rating">
              <Star size={13} fill="currentColor" />
              {course.rating.toFixed(1)}
              <span className="course-card__rating-count">
                ({formatStudentCount(course.studentsCount)})
              </span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={13} />
              {formatDuration(course.durationHours)}
            </span>
          </div>

          <div className="course-card__footer">
            <span className={`course-card__price${course.price === 0 ? ' course-card__price--free' : ''}`}>
              {formatPrice(course.price)}
            </span>
            <span className="course-card__duration">
              {course.lessonsCount} lessons
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
