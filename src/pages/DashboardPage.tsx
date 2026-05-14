import { BookOpen, Trophy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { StatCard } from '../components/dashboard/StatCard';
import { CourseProgressCard } from '../components/dashboard/CourseProgressCard';
import { CompletedCourseCard } from '../components/dashboard/CompletedCourseCard';
import { useAuthStore } from '../store/authStore';
import { getEnrolledCourses } from '../services/enrollmentService';
import { getCourseProgress } from '../services/progressService';
import { getCourseById } from '../services/courseService';
import '../styles/components/dashboard.css';

function EnrollmentRow({ enrollment }: {
  enrollment: { courseId: string; enrolledAt: string; completedAt: string | null }
}) {
  const { data: course } = useQuery({
    queryKey: ['course-by-id', enrollment.courseId],
    queryFn: () => getCourseById(enrollment.courseId),
  });

  const { data: progress } = useQuery({
    queryKey: ['course-progress', enrollment.courseId],
    queryFn: () => getCourseProgress(enrollment.courseId),
    enabled: !!course,
  });

  if (!course || !progress) return null;

  const mockProgress = {
    courseId: enrollment.courseId,
    progressPercent: progress.percent,
    lastLessonTitle: progress.lastCompletedLessonTitle,
    enrolledAt: enrollment.enrolledAt,
    completedAt: enrollment.completedAt ?? undefined,
  };

  if (enrollment.completedAt) {
    return <CompletedCourseCard course={course} progress={{ ...mockProgress, completedAt: enrollment.completedAt }} />;
  }
  return <CourseProgressCard course={course} progress={mockProgress} />;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = (user?.user_metadata?.name as string | undefined)?.split(' ')[0] ?? 'Estudiante';

  const { data: enrollments = [] } = useQuery({
    queryKey: ['enrollments'],
    queryFn: getEnrolledCourses,
  });

  const inProgress = enrollments.filter((e) => !e.completedAt);
  const completed = enrollments.filter((e) => !!e.completedAt);

  return (
    <PageWrapper>
      <MetaTags title="Mi aprendizaje" description="Revisa tu progreso y retoma donde lo dejaste." />
      <main className="dashboard">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.header className="dashboard__header" variants={fadeUp}>
            <h1 className="dashboard__greeting">Hola, {firstName} 👋</h1>
            <p className="dashboard__joined">Miembro de Desprogramados</p>
          </motion.header>

          <motion.div className="dashboard__stats" variants={fadeUp}>
            <StatCard icon={<BookOpen size={20} />} value={inProgress.length} label="Cursos en progreso" />
            <StatCard icon={<Trophy size={20} />} value={completed.length} label="Cursos completados" />
            <StatCard icon={<Zap size={20} />} value={enrollments.length} label="Cursos inscritos" />
          </motion.div>

          {inProgress.length > 0 && (
            <motion.section className="dashboard__section" variants={fadeUp}>
              <h2 className="dashboard__section-title">Continuar aprendiendo</h2>
              <div className="progress-courses">
                {inProgress.map((e) => <EnrollmentRow key={e.courseId} enrollment={e} />)}
              </div>
            </motion.section>
          )}

          {completed.length > 0 && (
            <motion.section className="dashboard__section" variants={fadeUp}>
              <h2 className="dashboard__section-title">Cursos completados</h2>
              <div className="completed-courses">
                {completed.map((e) => <EnrollmentRow key={e.courseId} enrollment={e} />)}
              </div>
            </motion.section>
          )}

          {enrollments.length === 0 && (
            <motion.div variants={fadeUp} style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1.125rem', marginBottom: 8 }}>Aún no estás inscrito en ningún curso.</p>
              <p style={{ fontSize: '0.9375rem' }}>Explora el catálogo y empieza a aprender hoy.</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </PageWrapper>
  );
}
