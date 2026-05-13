import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { VideoUpload } from '../../components/admin/VideoUpload';
import {
  adminGetCourse, adminGetSections, adminUpdateCourse,
  adminCreateSection, adminUpdateSection, adminDeleteSection,
  adminCreateLesson, adminUpdateLesson, adminDeleteLesson,
} from '../../services/adminService';
import '../../styles/components/admin.css';

export function AdminCourseEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: course, isLoading: loadingCourse } = useQuery({
    queryKey: ['admin-course', id],
    queryFn: () => adminGetCourse(id!),
    enabled: !!id,
  });

  const { data: sections = [], isLoading: loadingSections } = useQuery({
    queryKey: ['admin-sections', id],
    queryFn: () => adminGetSections(id!),
    enabled: !!id,
  });

  const [saving, setSaving] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [newSectionTitle, setNewSectionTitle] = useState('');

  if (id === 'new') return <Navigate to="/admin" replace />;
  if (loadingCourse) return <div className="admin-page"><p className="admin-loading">Cargando...</p></div>;
  if (!course) return <Navigate to="/admin" replace />;

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-sections', id] });
  };

  const handleSaveCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = new FormData(e.currentTarget);
      await adminUpdateCourse(id!, {
        title: form.get('title'),
        slug: form.get('slug'),
        description: form.get('description'),
        category: form.get('category'),
        level: form.get('level'),
        price: Number(form.get('price')),
        thumbnail_url: form.get('thumbnail_url') || null,
        learning_points: (form.get('learning_points') as string)
          .split('\n').map(s => s.trim()).filter(Boolean),
      });
      queryClient.invalidateQueries({ queryKey: ['admin-course', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    } finally {
      setSaving(false);
    }
  };

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;
    await adminCreateSection(id!, newSectionTitle.trim(), sections.length);
    setNewSectionTitle('');
    invalidate();
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('¿Eliminar sección y todas sus lecciones?')) return;
    await adminDeleteSection(sectionId);
    invalidate();
  };

  const handleAddLesson = async (sectionId: string, position: number) => {
    await adminCreateLesson(sectionId, {
      title: 'Nueva lección',
      duration_min: 5,
      position,
      is_preview: false,
    });
    invalidate();
  };

  const handleLessonChange = async (lessonId: string, field: string, value: unknown) => {
    await adminUpdateLesson(lessonId, { [field]: value });
    invalidate();
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('¿Eliminar lección?')) return;
    await adminDeleteLesson(lessonId);
    invalidate();
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <button className="admin-back" onClick={() => navigate('/admin')}>
          <ChevronLeft size={16} /> Volver
        </button>
        <h1 className="admin-page__title">Editar curso</h1>
      </div>

      {/* Course metadata form */}
      <form onSubmit={handleSaveCourse} className="admin-form">
        <h2 className="admin-section-title">Información general</h2>

        <div className="admin-form__row">
          <label className="admin-label">
            Título
            <input name="title" className="admin-input" defaultValue={course.title} required />
          </label>
          <label className="admin-label">
            Slug
            <input name="slug" className="admin-input" defaultValue={course.slug} required />
          </label>
        </div>

        <label className="admin-label">
          Descripción
          <textarea name="description" className="admin-input admin-input--textarea" defaultValue={course.description} rows={3} />
        </label>

        <div className="admin-form__row">
          <label className="admin-label">
            Categoría
            <select name="category" className="admin-input" defaultValue={course.category}>
              {['react','node','python','vue','angular','nest','go','java'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="admin-label">
            Nivel
            <select name="level" className="admin-input" defaultValue={course.level}>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </label>
          <label className="admin-label">
            Precio (USD)
            <input name="price" type="number" min="0" step="0.01" className="admin-input" defaultValue={course.price} />
          </label>
        </div>

        <label className="admin-label">
          URL de miniatura
          <input name="thumbnail_url" className="admin-input" defaultValue={course.thumbnail_url ?? ''} placeholder="https://..." />
        </label>

        <label className="admin-label">
          Puntos de aprendizaje (uno por línea)
          <textarea
            name="learning_points"
            className="admin-input admin-input--textarea"
            defaultValue={(course.learning_points ?? []).join('\n')}
            rows={4}
            placeholder="Qué aprenderá el estudiante..."
          />
        </label>

        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          <Save size={15} />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>

      {/* Sections & Lessons */}
      <div className="admin-sections">
        <h2 className="admin-section-title">Secciones y lecciones</h2>

        {loadingSections ? <p className="admin-loading">Cargando...</p> : sections.map((sec) => {
          const isOpen = openSections.has(sec.id);
          const lessons = [...(sec.lessons ?? [])].sort((a, b) => a.position - b.position);
          return (
            <div key={sec.id} className="admin-section-block">
              <div className="admin-section-block__header">
                <button className="admin-section-block__toggle" onClick={() => toggleSection(sec.id)}>
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <input
                    className="admin-section-block__title-input"
                    defaultValue={sec.title}
                    onBlur={(e) => adminUpdateSection(sec.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="admin-section-block__count">{lessons.length} lecciones</span>
                </button>
                <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => handleDeleteSection(sec.id)}>
                  <Trash2 size={14} />
                </button>
              </div>

              {isOpen && (
                <div className="admin-lessons">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="admin-lesson">
                      <div className="admin-lesson__fields">
                        <input
                          className="admin-input admin-input--sm"
                          defaultValue={lesson.title}
                          placeholder="Título"
                          onBlur={(e) => handleLessonChange(lesson.id, 'title', e.target.value)}
                        />
                        <input
                          className="admin-input admin-input--sm admin-input--narrow"
                          type="number"
                          min="1"
                          defaultValue={lesson.duration_min}
                          placeholder="Min"
                          onBlur={(e) => handleLessonChange(lesson.id, 'duration_min', Number(e.target.value))}
                        />
                        <label className="admin-checkbox">
                          <input
                            type="checkbox"
                            defaultChecked={lesson.is_preview}
                            onChange={(e) => handleLessonChange(lesson.id, 'is_preview', e.target.checked)}
                          />
                          Vista previa
                        </label>
                      </div>
                      <div className="admin-lesson__video">
                        <VideoUpload
                          lessonId={lesson.id}
                          currentUrl={lesson.video_url ?? undefined}
                          onUploaded={() => invalidate()}
                        />
                      </div>
                      <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => handleDeleteLesson(lesson.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => handleAddLesson(sec.id, lessons.length)}
                  >
                    <Plus size={13} /> Agregar lección
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <div className="admin-add-section">
          <input
            className="admin-input"
            placeholder="Nombre de la nueva sección"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
          />
          <button className="admin-btn admin-btn--secondary" onClick={handleAddSection}>
            <Plus size={15} /> Agregar sección
          </button>
        </div>
      </div>
    </div>
  );
}
