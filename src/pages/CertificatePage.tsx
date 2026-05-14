import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Download, ArrowLeft } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { getCourseById } from '../services/courseService';
import { getEnrolledCourses } from '../services/enrollmentService';
import { useAuthStore } from '../store/authStore';
import '../styles/components/certificate.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function CertificatePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const user = useAuthStore((s) => s.user);
  const studentName = (user?.user_metadata?.name as string | undefined) ?? user?.email ?? 'Estudiante';

  const { data: course, isLoading: loadingCourse } = useQuery({
    queryKey: ['course-by-id', courseId],
    queryFn: () => getCourseById(courseId!),
    enabled: !!courseId,
  });

  const { data: enrollments = [], isLoading: loadingEnrollment } = useQuery({
    queryKey: ['enrollments'],
    queryFn: getEnrolledCourses,
  });

  if (loadingCourse || loadingEnrollment) return null;

  const enrollment = enrollments.find((e) => e.courseId === courseId);
  if (!course || !enrollment?.completedAt) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <MetaTags title={`Certificado — ${course.title}`} description="Certificado de finalización" />

      {/* Screen controls — hidden on print */}
      <div className="cert-controls">
        <Link to="/dashboard" className="cert-back">
          <ArrowLeft size={15} /> Volver al dashboard
        </Link>
        <button className="cert-download-btn" onClick={() => window.print()}>
          <Download size={15} />
          Descargar PDF
        </button>
      </div>

      {/* Certificate */}
      <div className="cert-wrapper">
        <div className="cert">
          <div className="cert__top-bar" />

          <div className="cert__header">
            <p className="cert__platform">Desprogramados</p>
            <p className="cert__eyebrow">Certificado de finalización</p>
          </div>

          <div className="cert__body">
            <p className="cert__label">Este certificado se otorga a</p>
            <h1 className="cert__student">{studentName}</h1>
            <p className="cert__label">por haber completado satisfactoriamente el curso</p>
            <h2 className="cert__course">{course.title}</h2>
            <p className="cert__meta">
              {course.durationHours}h · {course.lessonsCount} lecciones · Nivel {course.level === 'beginner' ? 'principiante' : course.level === 'intermediate' ? 'intermedio' : 'avanzado'}
            </p>
          </div>

          <div className="cert__footer">
            <div className="cert__footer-item">
              <span className="cert__footer-value">{formatDate(enrollment.completedAt)}</span>
              <span className="cert__footer-label">Fecha de finalización</span>
            </div>
            <div className="cert__footer-divider" />
            <div className="cert__footer-item">
              <span className="cert__footer-value cert__footer-value--brand">desprogramados.shop</span>
              <span className="cert__footer-label">Plataforma</span>
            </div>
          </div>

          <div className="cert__bottom-bar" />
        </div>
      </div>
    </>
  );
}
