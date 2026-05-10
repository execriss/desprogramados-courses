import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Users, BookOpen, ChevronDown, Check, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockCourses } from '../data/mockCourses';
import { formatPrice, formatDuration, formatStudentCount } from '../utils/formatters';
import type { Course } from '../types';
import '../styles/components/course-detail.css';

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

const LEARN_ITEMS = [
  'Build real production-ready projects',
  'Master modern patterns and best practices',
  'Write clean, maintainable code',
  'Deploy your apps with confidence',
  'Debug and solve problems independently',
  'Understand core architecture decisions',
];

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = mockCourses.find((c) => c.slug === slug);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  if (!course) return <Navigate to="/courses" replace />;

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const instructorInitials = course.instructor
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <PageWrapper>
      <main className="course-detail">
        {/* Hero */}
        <div className="course-detail__hero">
          <div className="course-detail__hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="course-detail__meta">
                <Badge variant={course.category}>{CATEGORY_LABELS[course.category]}</Badge>
                <Badge variant={course.level}>{course.level}</Badge>
              </div>

              <h1 className="course-detail__title">{course.title}</h1>
              <p className="course-detail__description">{course.description}</p>

              <div className="course-detail__stats">
                <span className="course-detail__stat">
                  <span className="course-detail__rating-stars">★</span>
                  <span className="course-detail__stat-value">{course.rating.toFixed(1)}</span>
                  <span>({formatStudentCount(course.studentsCount)} students)</span>
                </span>
                <span className="course-detail__stat">
                  <Clock size={15} />
                  <span className="course-detail__stat-value">{formatDuration(course.durationHours)}</span>
                </span>
                <span className="course-detail__stat">
                  <BookOpen size={15} />
                  <span className="course-detail__stat-value">{course.lessonsCount} lessons</span>
                </span>
                <span className="course-detail__stat">
                  <Users size={15} />
                  <span className="course-detail__stat-value">{formatStudentCount(course.studentsCount)}</span>
                  <span>enrolled</span>
                </span>
              </div>
            </motion.div>

            {/* Sidebar (shows inline on hero on large screens) */}
            <motion.aside
              className="course-sidebar"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="course-sidebar__preview">
                <PlayCircle size={48} style={{ color: 'var(--color-text-muted)', opacity: 0.5 }} />
              </div>
              <div className="course-sidebar__body">
                <p className="course-sidebar__price">{formatPrice(course.price)}</p>
                <Link to="/register">
                  <Button variant="primary" size="lg" fullWidth>Enroll now</Button>
                </Link>
                <Button variant="secondary" size="md" fullWidth>Try free preview</Button>
                <ul className="course-sidebar__highlights">
                  <li className="course-sidebar__highlight">
                    <Clock size={15} className="course-sidebar__highlight-icon" />
                    {formatDuration(course.durationHours)} of on-demand video
                  </li>
                  <li className="course-sidebar__highlight">
                    <BookOpen size={15} className="course-sidebar__highlight-icon" />
                    {course.lessonsCount} lessons
                  </li>
                  <li className="course-sidebar__highlight">
                    <Users size={15} className="course-sidebar__highlight-icon" />
                    {formatStudentCount(course.studentsCount)} students enrolled
                  </li>
                  <li className="course-sidebar__highlight">
                    <Check size={15} className="course-sidebar__highlight-icon" />
                    Full lifetime access
                  </li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>

        {/* Body */}
        <div className="course-detail__body">
          <div className="course-detail__main">
            {/* What you'll learn */}
            <section>
              <h2 className="course-section__title">What you'll learn</h2>
              <div className="learn-grid">
                {LEARN_ITEMS.map((item) => (
                  <div key={item} className="learn-item">
                    <Check size={15} className="learn-item__icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="course-section__title">Course curriculum</h2>
              {course.curriculum.map((section, idx) => {
                const isOpen = openSections.has(idx);
                return (
                  <div key={section.title} className="curriculum-section">
                    <button
                      className="curriculum-section__header"
                      onClick={() => toggleSection(idx)}
                      aria-expanded={isOpen}
                    >
                      <div>
                        <span className="curriculum-section__name">{section.title}</span>
                        <span className="curriculum-section__count" style={{ marginLeft: '12px' }}>
                          {section.lessons.length} lessons
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`curriculum-section__chevron${isOpen ? ' curriculum-section__chevron--open' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <ul className="curriculum-lessons">
                        {section.lessons.map((lesson) => (
                          <li key={lesson.title} className="curriculum-lesson">
                            <PlayCircle size={15} className="curriculum-lesson__icon" />
                            <span className="curriculum-lesson__title">{lesson.title}</span>
                            {lesson.isPreview && (
                              <span className="curriculum-lesson__preview">Preview</span>
                            )}
                            <span className="curriculum-lesson__duration">{lesson.durationMin}m</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </section>

            {/* Instructor */}
            <section>
              <h2 className="course-section__title">About the instructor</h2>
              <div className="instructor-card">
                <div className="instructor-card__avatar" aria-hidden="true">
                  {instructorInitials}
                </div>
                <div>
                  <p className="instructor-card__name">{course.instructor}</p>
                  <p className="instructor-card__bio">
                    Senior software engineer with 10+ years of industry experience building scalable systems.
                    Passionate about teaching practical, production-grade skills to the next generation of developers.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar spacer column on large screens */}
          <div aria-hidden="true" />
        </div>
      </main>
    </PageWrapper>
  );
}
