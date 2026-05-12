import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Circle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { mockCourses } from '../data/mockCourses';
import '../styles/components/player.css';

export function CoursePlayerPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = mockCourses.find((c) => c.slug === slug);

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  if (!course) return <Navigate to="/courses" replace />;

  const allLessons = course.curriculum.flatMap((section, si) =>
    section.lessons.map((_l, li) => ({ sectionIdx: si, lessonIdx: li }))
  );

  const lKey = (si: number, li: number) => `${si}-${li}`;
  const activeKey = lKey(activeSectionIdx, activeLessonIdx);
  const activeLesson = course.curriculum[activeSectionIdx]?.lessons[activeLessonIdx];
  const activeSection = course.curriculum[activeSectionIdx];

  const currentFlatIdx = allLessons.findIndex(
    (l) => l.sectionIdx === activeSectionIdx && l.lessonIdx === activeLessonIdx
  );
  const isFirst = currentFlatIdx === 0;
  const isLast = currentFlatIdx === allLessons.length - 1;
  const isDone = completedLessons.has(activeKey);
  const progress = allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0;

  const goToLesson = (si: number, li: number) => {
    setActiveSectionIdx(si);
    setActiveLessonIdx(li);
    setOpenSections((prev) => new Set([...prev, si]));
  };

  const goToPrev = () => {
    const prev = allLessons[currentFlatIdx - 1];
    if (prev) goToLesson(prev.sectionIdx, prev.lessonIdx);
  };

  const goToNext = () => {
    const next = allLessons[currentFlatIdx + 1];
    if (next) goToLesson(next.sectionIdx, next.lessonIdx);
  };

  const markComplete = () => {
    setCompletedLessons((prev) => new Set([...prev, activeKey]));
    const next = allLessons[currentFlatIdx + 1];
    if (next) goToLesson(next.sectionIdx, next.lessonIdx);
  };

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <PageWrapper>
      <div className="player">
        {/* Topbar */}
        <div className="player__topbar">
          <Link to={`/courses/${course.slug}`} className="player__back">
            <ChevronLeft size={15} />
            Volver al curso
          </Link>
          <p className="player__course-title">{course.title}</p>
          <div className="player__progress-info">
            <span>{completedLessons.size} / {allLessons.length} lecciones</span>
            <div className="player__progress-bar">
              <div className="player__progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="player__body">
          {/* Sidebar — curriculum */}
          <aside className="player__sidebar">
            <div className="player__sidebar-header">Contenido del curso</div>
            {course.curriculum.map((section, si) => {
              const isOpen = openSections.has(si);
              return (
                <div key={si} className="player-section">
                  <button
                    className="player-section__header"
                    onClick={() => toggleSection(si)}
                    aria-expanded={isOpen}
                  >
                    <span className="player-section__title">{section.title}</span>
                    <ChevronDown
                      size={14}
                      className={`player-section__chevron${isOpen ? ' player-section__chevron--open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <ul className="player-section__lessons">
                      {section.lessons.map((lesson, li) => {
                        const key = lKey(si, li);
                        const isActive = si === activeSectionIdx && li === activeLessonIdx;
                        const done = completedLessons.has(key);
                        return (
                          <li key={li}>
                            <button
                              className={[
                                'player-lesson',
                                isActive ? 'player-lesson--active' : '',
                                done ? 'player-lesson--done' : '',
                              ]
                                .filter(Boolean)
                                .join(' ')}
                              onClick={() => goToLesson(si, li)}
                            >
                              <span className="player-lesson__icon" aria-hidden="true">
                                {done ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                              </span>
                              <span className="player-lesson__title">{lesson.title}</span>
                              <span className="player-lesson__duration">{lesson.durationMin}m</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </aside>

          {/* Main — video + info */}
          <div className="player__main">
            <motion.div
              key={activeKey}
              className="player__video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="player__video-inner">
                <div className="player__play-btn" aria-hidden="true">
                  <Play size={28} fill="white" color="white" />
                </div>
                <p className="player__video-label">{activeLesson?.title}</p>
              </div>
            </motion.div>

            <div className="player__info">
              <p className="player__section-label">{activeSection?.title}</p>
              <h2 className="player__lesson-title">{activeLesson?.title}</h2>
              <p className="player__lesson-meta">
                {activeLesson?.durationMin} min · {isDone ? 'Completada ✓' : 'En progreso'}
              </p>

              <div className="player__actions">
                <Button variant="secondary" size="sm" onClick={goToPrev} disabled={isFirst}>
                  <ChevronLeft size={15} />
                  Anterior
                </Button>
                {isDone ? (
                  <Button variant="ghost" size="sm" onClick={goToNext} disabled={isLast}>
                    Siguiente lección
                    <ChevronRight size={15} />
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={markComplete}>
                    Marcar como completada
                    {!isLast && <ChevronRight size={15} />}
                  </Button>
                )}
                {!isDone && (
                  <Button variant="secondary" size="sm" onClick={goToNext} disabled={isLast}>
                    Siguiente
                    <ChevronRight size={15} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
