import { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, Users, BookOpen, ChevronDown, Check, PlayCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CourseDetailSkeleton } from '../components/courses/CourseDetailSkeleton';
import { useCourse } from '../hooks/useCourse';
import { getInstructorById } from '../services/instructorService';
import { isEnrolled, enrollFree } from '../services/enrollmentService';
import { getCourseProgress } from '../services/progressService';
import { useAuthStore } from '../store/authStore';
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

const LEVEL_LABELS: Record<Course['level'], string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

const LEARN_ITEMS_DEFAULT = [
  'Patrones y arquitecturas usados en equipos de ingeniería reales',
  'Las decisiones técnicas detrás del código — el "qué" y el "por qué"',
  'Flujo de trabajo profesional: estructura de proyecto y deploy real',
  'Debugging como lo hacen los seniors: encontrar el problema raíz',
  'Integración con herramientas del ecosistema real (Redis, Docker, AWS)',
  'Operación en producción con observabilidad básica',
];

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { course, isLoading } = useCourse(slug);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const { data: instructor } = useQuery({
    queryKey: ['instructor-by-id', course?.instructorId],
    queryFn: () => getInstructorById(course!.instructorId),
    enabled: !!course?.instructorId,
  });

  const { data: enrolled = false } = useQuery({
    queryKey: ['enrolled', course?.id],
    queryFn: () => isEnrolled(course!.id),
    enabled: !!course?.id && isLoggedIn,
  });

  const { data: progress } = useQuery({
    queryKey: ['course-progress', course?.id],
    queryFn: () => getCourseProgress(course!.id),
    enabled: !!course?.id && enrolled,
  });

  const handleEnroll = async () => {
    if (!course) return;
    if (!isLoggedIn) {
      navigate(`/login?redirect=/courses/${course.slug}/play`);
      return;
    }
    setEnrolling(true);
    try {
      await enrollFree(course.id);
      navigate(`/courses/${course.slug}/play`);
    } finally {
      setEnrolling(false);
    }
  };

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <MetaTags title="Cargando curso..." />
        <CourseDetailSkeleton />
      </PageWrapper>
    );
  }

  if (!course) return <Navigate to="/courses" replace />;

  const instructorName = instructor?.name ?? course.instructorName ?? 'Instructor';
  const instructorInitials = instructorName.split(' ').map((n) => n[0]).join('');

  return (
    <PageWrapper>
      <MetaTags
        title={course.title}
        description={course.description.slice(0, 160)}
      />
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
                <Badge variant={course.level}>{LEVEL_LABELS[course.level]}</Badge>
              </div>

              <h1 className="course-detail__title">{course.title}</h1>
              <p className="course-detail__description">{course.description}</p>

              <div className="course-detail__stats">
                <span className="course-detail__stat">
                  <span className="course-detail__rating-stars">★</span>
                  <span className="course-detail__stat-value">{course.rating.toFixed(1)}</span>
                  <span>({formatStudentCount(course.studentsCount)} estudiantes)</span>
                </span>
                <span className="course-detail__stat">
                  <Clock size={15} />
                  <span className="course-detail__stat-value">{formatDuration(course.durationHours)}</span>
                </span>
                <span className="course-detail__stat">
                  <BookOpen size={15} />
                  <span className="course-detail__stat-value">{course.lessonsCount} lecciones</span>
                </span>
                <span className="course-detail__stat">
                  <Users size={15} />
                  <span className="course-detail__stat-value">{formatStudentCount(course.studentsCount)}</span>
                  <span>inscritos</span>
                </span>
              </div>
            </motion.div>

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

                {enrolled ? (
                  <>
                    {progress && progress.totalCount > 0 && (
                      <div className="course-sidebar__progress">
                        <div className="course-sidebar__progress-bar">
                          <div
                            className="course-sidebar__progress-fill"
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                        <span className="course-sidebar__progress-label">
                          {progress.percent}% completado
                        </span>
                      </div>
                    )}
                    <Link to={`/courses/${course.slug}/play`}>
                      <Button variant="primary" size="lg" fullWidth>
                        {progress && progress.completedCount > 0 ? 'Continuar aprendiendo' : 'Empezar curso'}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? <><Loader2 size={16} className="spin" /> Inscribiendo...</> : 'Inscribirse gratis'}
                  </Button>
                )}

                <ul className="course-sidebar__highlights">
                  <li className="course-sidebar__highlight">
                    <Clock size={15} className="course-sidebar__highlight-icon" />
                    {formatDuration(course.durationHours)} de vídeo bajo demanda
                  </li>
                  <li className="course-sidebar__highlight">
                    <BookOpen size={15} className="course-sidebar__highlight-icon" />
                    {course.lessonsCount} lecciones
                  </li>
                  <li className="course-sidebar__highlight">
                    <Users size={15} className="course-sidebar__highlight-icon" />
                    {formatStudentCount(course.studentsCount)} estudiantes inscritos
                  </li>
                  <li className="course-sidebar__highlight">
                    <Check size={15} className="course-sidebar__highlight-icon" />
                    Acceso de por vida
                  </li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>

        {/* Body */}
        <div className="course-detail__body">
          <div className="course-detail__main">
            {/* Lo que aprenderás */}
            <section>
              <h2 className="course-section__title">Lo que aprenderás</h2>
              <div className="learn-grid">
                {(course.learningPoints ?? LEARN_ITEMS_DEFAULT).map((item) => (
                  <div key={item} className="learn-item">
                    <Check size={15} className="learn-item__icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Temario */}
            <section>
              <h2 className="course-section__title">Temario del curso</h2>
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
                          {section.lessons.length} lección{section.lessons.length !== 1 ? 'es' : ''}
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
                              <span className="curriculum-lesson__preview">Vista previa</span>
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
              <h2 className="course-section__title">Sobre el instructor</h2>
              <div className="instructor-card">
                <div className="instructor-card__avatar" aria-hidden="true">
                  {instructorInitials}
                </div>
                <div>
                  <Link
                    to={`/instructors/${instructor?.slug ?? ''}`}
                    className="instructor-card__name instructor-card__name--link"
                  >
                    {instructorName}
                  </Link>
                  {instructor && (
                    <p className="instructor-card__title">{instructor.title}</p>
                  )}
                  <p className="instructor-card__bio">
                    {instructor?.shortBio ?? 'Experto con experiencia real en producción.'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div aria-hidden="true" />
        </div>
      </main>
    </PageWrapper>
  );
}
