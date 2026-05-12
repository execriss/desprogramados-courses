import { BookOpen, Trophy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { StatCard } from '../components/dashboard/StatCard';
import { CourseProgressCard } from '../components/dashboard/CourseProgressCard';
import { CompletedCourseCard } from '../components/dashboard/CompletedCourseCard';
import { useAuthStore } from '../store/authStore';
import { mockUserProgress } from '../data/mockUserProgress';
import { mockCourses } from '../data/mockCourses';
import '../styles/components/dashboard.css';

const inProgress = mockUserProgress.filter((p) => p.progressPercent < 100);
const completed = mockUserProgress.filter((p) => p.progressPercent === 100);

const totalLessons = completed.reduce((sum, p) => {
  const course = mockCourses.find((c) => c.id === p.courseId);
  return sum + (course?.curriculum?.reduce((s, sec) => s + sec.lessons.length, 0) ?? 0);
}, 0);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(' ')[0] ?? 'Estudiante';

  return (
    <PageWrapper>
      <MetaTags title="Mi aprendizaje" description="Revisa tu progreso y retoma donde lo dejaste." />
      <main className="dashboard">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.header className="dashboard__header" variants={fadeUp}>
            <h1 className="dashboard__greeting">Hola, {firstName} 👋</h1>
            <p className="dashboard__joined">Miembro desde marzo 2026</p>
          </motion.header>

          <motion.div className="dashboard__stats" variants={fadeUp}>
            <StatCard
              icon={<BookOpen size={20} />}
              value={inProgress.length}
              label="Cursos en progreso"
            />
            <StatCard
              icon={<Trophy size={20} />}
              value={completed.length}
              label="Cursos completados"
            />
            <StatCard
              icon={<Zap size={20} />}
              value={totalLessons}
              label="Lecciones terminadas"
            />
          </motion.div>

          {inProgress.length > 0 && (
            <motion.section className="dashboard__section" variants={fadeUp}>
              <h2 className="dashboard__section-title">Continuar aprendiendo</h2>
              <div className="progress-courses">
                {inProgress.map((progress) => {
                  const course = mockCourses.find((c) => c.id === progress.courseId);
                  if (!course) return null;
                  return (
                    <CourseProgressCard key={progress.courseId} course={course} progress={progress} />
                  );
                })}
              </div>
            </motion.section>
          )}

          {completed.length > 0 && (
            <motion.section className="dashboard__section" variants={fadeUp}>
              <h2 className="dashboard__section-title">Cursos completados</h2>
              <div className="completed-courses">
                {completed.map((progress) => {
                  const course = mockCourses.find((c) => c.id === progress.courseId);
                  if (!course) return null;
                  return (
                    <CompletedCourseCard key={progress.courseId} course={course} progress={progress} />
                  );
                })}
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>
    </PageWrapper>
  );
}
