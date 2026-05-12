import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseCardSkeleton } from '../components/courses/CourseCardSkeleton';
import { useInstructor } from '../hooks/useInstructor';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../services/courseService';
import '../styles/components/instructor.css';

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}K`;
  return String(n);
}

export function InstructorPage() {
  const { slug } = useParams<{ slug: string }>();
  const { instructor, isLoading } = useInstructor(slug);

  const { data: allCourses = [] } = useQuery({
    queryKey: ['courses', {}],
    queryFn: () => getCourses(),
    enabled: !!instructor,
  });

  if (isLoading) {
    return (
      <PageWrapper>
        <main className="instructor">
          <div className="instructor__hero" style={{ gap: 24 }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--color-border)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 36, width: 240, background: 'var(--color-border)', borderRadius: 8, marginBottom: 8 }} />
              <div style={{ height: 20, width: 320, background: 'var(--color-border)', borderRadius: 6 }} />
            </div>
          </div>
          <div className="instructor__courses-grid">
            {Array.from({ length: 2 }).map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        </main>
      </PageWrapper>
    );
  }

  if (!instructor) return <Navigate to="/courses" replace />;

  const courses = allCourses.filter((c) => c.instructorId === instructor.id);
  const initials = instructor.name.split(' ').slice(0, 2).map((w) => w[0]).join('');

  return (
    <PageWrapper>
      <MetaTags title={instructor.name} description={instructor.shortBio} />
      <main className="instructor">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div className="instructor__hero">
            <div className="instructor__avatar" aria-hidden="true">{initials}</div>
            <div className="instructor__info">
              <h1 className="instructor__name">{instructor.name}</h1>
              <p className="instructor__title">{instructor.title}</p>
              <div className="instructor__stats">
                <div className="instructor__stat">
                  <span className="instructor__stat-value">{instructor.stats.coursesCount}</span>
                  <span className="instructor__stat-label">Cursos</span>
                </div>
                <div className="instructor__stat">
                  <span className="instructor__stat-value">{formatCount(instructor.stats.studentsCount)}</span>
                  <span className="instructor__stat-label">Estudiantes</span>
                </div>
                <div className="instructor__stat">
                  <span className="instructor__stat-value">{instructor.stats.rating.toFixed(1)}</span>
                  <span className="instructor__stat-label">Valoración media</span>
                </div>
              </div>
            </div>
          </div>

          <section className="instructor__bio-section">
            <h2 className="instructor__bio-title">Sobre {instructor.name.split(' ')[0]}</h2>
            <p className="instructor__bio-text">{instructor.fullBio}</p>
          </section>

          {courses.length > 0 && (
            <section>
              <h2 className="instructor__courses-title">
                Cursos de {instructor.name.split(' ')[0]} ({courses.length})
              </h2>
              <div className="instructor__courses-grid">
                {courses.map((course, i) => (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.07 }}>
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </main>
    </PageWrapper>
  );
}
