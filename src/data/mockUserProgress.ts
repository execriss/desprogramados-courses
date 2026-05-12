export interface UserProgress {
  courseId: string;
  progressPercent: number;
  lastLessonTitle: string;
  enrolledAt: string;
  completedAt?: string;
}

export const mockUserProgress: UserProgress[] = [
  {
    courseId: '1',
    progressPercent: 68,
    lastLessonTitle: 'Memoización correcta: cuándo memo realmente ayuda',
    enrolledAt: '2026-03-10',
  },
  {
    courseId: '2',
    progressPercent: 35,
    lastLessonTitle: 'JWT vs Sessions: la decisión real',
    enrolledAt: '2026-04-02',
  },
  {
    courseId: '6',
    progressPercent: 12,
    lastLessonTitle: 'Módulos, Providers y Controladores',
    enrolledAt: '2026-04-28',
  },
  {
    courseId: '7',
    progressPercent: 100,
    lastLessonTitle: 'Estrategias de deploy con blue/green',
    enrolledAt: '2026-01-15',
    completedAt: '2026-02-20',
  },
  {
    courseId: '3',
    progressPercent: 100,
    lastLessonTitle: 'Integrar y servir modelos en APIs reales',
    enrolledAt: '2025-11-10',
    completedAt: '2025-12-18',
  },
];
