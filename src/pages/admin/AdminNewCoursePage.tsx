import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Save } from 'lucide-react';
import { adminCreateCourse, adminGetInstructors } from '../../services/adminService';
import '../../styles/components/admin.css';

const CATEGORIES = ['react','node','python','vue','angular','nest','go','java'];

function toSlug(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function AdminNewCoursePage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [slug, setSlug] = useState('');

  const { data: instructors = [] } = useQuery({
    queryKey: ['admin-instructors'],
    queryFn: adminGetInstructors,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!slugManual) setSlug(toSlug(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const form = new FormData(e.currentTarget);
      const id = await adminCreateCourse({
        title: form.get('title') as string,
        slug: slug || toSlug(form.get('title') as string),
        description: form.get('description') as string,
        category: form.get('category') as string,
        level: form.get('level') as string,
        price: Number(form.get('price')),
        instructor_id: form.get('instructor_id') as string,
      });
      navigate(`/admin/courses/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear el curso');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <button className="admin-back" onClick={() => navigate('/admin')}>
          <ChevronLeft size={16} /> Volver
        </button>
        <h1 className="admin-page__title">Nuevo curso</h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <label className="admin-label">
          Título
          <input
            name="title"
            className="admin-input"
            required
            placeholder="Ej: React en Producción"
            onChange={handleTitleChange}
          />
        </label>

        <label className="admin-label">
          Slug (URL)
          <input
            name="slug"
            className="admin-input"
            required
            placeholder="react-en-produccion"
            value={slug}
            onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }}
          />
        </label>

        <label className="admin-label">
          Descripción
          <textarea name="description" className="admin-input admin-input--textarea" rows={3} required />
        </label>

        <div className="admin-form__row">
          <label className="admin-label">
            Categoría
            <select name="category" className="admin-input" required>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="admin-label">
            Nivel
            <select name="level" className="admin-input" required>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </label>
          <label className="admin-label">
            Precio (USD)
            <input name="price" type="number" min="0" step="0.01" defaultValue="0" className="admin-input" required />
          </label>
        </div>

        <label className="admin-label">
          Instructor
          <select name="instructor_id" className="admin-input" required>
            <option value="">— Seleccioná un instructor —</option>
            {instructors.map(i => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
        </label>

        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}

        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          <Save size={15} />
          {saving ? 'Creando...' : 'Crear curso'}
        </button>
      </form>
    </div>
  );
}
