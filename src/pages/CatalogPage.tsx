import { Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { CourseCard } from '../components/courses/CourseCard';
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types';
import '../styles/components/catalog.css';

type Category = Course['category'] | 'all';
type Level = Course['level'] | 'all';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
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
  { value: 'all', label: 'All levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export function CatalogPage() {
  const { courses, search, setSearch, category, setCategory, level, setLevel } = useCourses();

  return (
    <PageWrapper>
      <main className="catalog">
        <div className="catalog__inner">
          <header className="catalog__header">
            <h1 className="catalog__title">Course Catalog</h1>
            <p className="catalog__subtitle">
              {courses.length} course{courses.length !== 1 ? 's' : ''} available
            </p>
          </header>

          <div className="catalog__toolbar">
            <div className="search-bar">
              <Search size={16} className="search-bar__icon" aria-hidden="true" />
              <input
                type="search"
                className="search-bar__input"
                placeholder="Search courses, instructors, topics…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search courses"
              />
            </div>

            <div className="filter-chips" role="group" aria-label="Filter by technology">
              <span className="filter-chips__label">Tech:</span>
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

            <div className="filter-chips" role="group" aria-label="Filter by level">
              <span className="filter-chips__label">Level:</span>
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

          {courses.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} className="empty-state__icon" />
              <h2 className="empty-state__title">No courses found</h2>
              <p className="empty-state__text">Try adjusting your filters or search terms.</p>
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
