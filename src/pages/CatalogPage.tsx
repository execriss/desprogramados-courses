import { Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseCardSkeleton } from '../components/courses/CourseCardSkeleton';
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types';
import '../styles/components/catalog.css';

type Category = Course['category'] | 'all';
type Level = Course['level'] | 'all';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'nest', label: 'NestJS' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
];

const LEVELS: { value: Level; label: string }[] = [
  { value: 'all', label: 'Todos los niveles' },
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

export function CatalogPage() {
  const { courses, isLoading, search, setSearch, category, setCategory, level, setLevel } = useCourses();

  return (
    <PageWrapper>
      <MetaTags
        title="Catálogo de cursos"
        description="Explora todos los cursos de Desprogramados. Filtra por tecnología y nivel: React, Node.js, Python, Go, Vue, Angular y más."
      />
      <main className="catalog">
        <div className="catalog__inner">
          <header className="catalog__header">
            <h1 className="catalog__title">Catálogo de cursos</h1>
            <p className="catalog__subtitle">
              {courses.length} curso{courses.length !== 1 ? 's' : ''} disponible{courses.length !== 1 ? 's' : ''}
            </p>
          </header>

          <div className="catalog__toolbar">
            <div className="search-bar">
              <Search size={16} className="search-bar__icon" aria-hidden="true" />
              <input
                type="search"
                className="search-bar__input"
                placeholder="Buscar cursos, instructores, temas…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Buscar cursos"
              />
            </div>

            <div className="filter-chips" role="group" aria-label="Filtrar por tecnología">
              <span className="filter-chips__label">Tecnología:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className={`chip${category === cat.value ? ' chip--active' : ''}`}
                  onClick={() => setCategory(cat.value)}
                  aria-pressed={category === cat.value}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="filter-chips" role="group" aria-label="Filtrar por nivel">
              <span className="filter-chips__label">Nivel:</span>
              {LEVELS.map((lvl) => (
                <button
                  key={lvl.value}
                  className={`chip${level === lvl.value ? ' chip--active' : ''}`}
                  onClick={() => setLevel(lvl.value)}
                  aria-pressed={level === lvl.value}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="course-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} className="empty-state__icon" />
              <h2 className="empty-state__title">No se encontraron cursos</h2>
              <p className="empty-state__text">Prueba ajustando los filtros o los términos de búsqueda.</p>
            </div>
          ) : (
            <motion.div
              className="course-grid"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </PageWrapper>
  );
}
