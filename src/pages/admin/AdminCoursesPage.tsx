import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Eye, EyeOff, Edit2 } from 'lucide-react';
import { adminGetAllCourses, adminTogglePublished } from '../../services/adminService';
import '../../styles/components/admin.css';

export function AdminCoursesPage() {
  const queryClient = useQueryClient();
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: adminGetAllCourses,
  });

  const [toggling, setToggling] = useState<string | null>(null);

  const handleToggle = async (id: string, current: boolean) => {
    setToggling(id);
    try {
      await adminTogglePublished(id, !current);
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Cursos</h1>
        <Link to="/admin/courses/new" className="admin-btn admin-btn--primary">
          <PlusCircle size={16} />
          Nuevo curso
        </Link>
      </div>

      {isLoading ? (
        <p className="admin-loading">Cargando...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Nivel</th>
              <th>Precio</th>
              <th>Estudiantes</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td className="admin-table__title">{c.title}</td>
                <td><span className="admin-badge">{c.category}</span></td>
                <td>{c.level}</td>
                <td>{c.price === 0 ? 'Gratis' : `$${c.price}`}</td>
                <td>{c.students_count ?? 0}</td>
                <td>
                  <span className={`admin-status ${c.is_published ? 'admin-status--active' : 'admin-status--draft'}`}>
                    {c.is_published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="admin-table__actions">
                  <Link to={`/admin/courses/${c.id}`} className="admin-icon-btn" title="Editar">
                    <Edit2 size={15} />
                  </Link>
                  <button
                    className="admin-icon-btn"
                    title={c.is_published ? 'Despublicar' : 'Publicar'}
                    onClick={() => handleToggle(c.id, !!c.is_published)}
                    disabled={toggling === c.id}
                  >
                    {c.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
