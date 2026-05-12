import { supabase } from '../lib/supabase';

export async function markLessonComplete(lessonId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('lesson_progress')
    .insert({ user_id: user.id, lesson_id: lessonId });

  if (error && error.code !== '23505') throw error; // ignore duplicate
}

export async function getCompletedLessonIds(courseId: string): Promise<Set<string>> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data: sections } = await supabase
    .from('sections')
    .select('lessons(id)')
    .eq('course_id', courseId);

  const lessonIds = (sections ?? []).flatMap((s: { lessons: { id: string }[] }) =>
    s.lessons.map((l) => l.id)
  );
  if (!lessonIds.length) return new Set();

  const { data } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .in('lesson_id', lessonIds);

  return new Set((data ?? []).map((r) => r.lesson_id ?? ''));
}

export async function getCourseProgress(courseId: string): Promise<{
  completedCount: number;
  totalCount: number;
  percent: number;
  lastCompletedLessonTitle: string;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { completedCount: 0, totalCount: 0, percent: 0, lastCompletedLessonTitle: '' };

  const { data: sections } = await supabase
    .from('sections')
    .select('lessons(id, title, position)')
    .eq('course_id', courseId)
    .order('position');

  const allLessons = (sections ?? []).flatMap((s: { lessons: { id: string; title: string; position: number }[] }) =>
    s.lessons
  );

  if (!allLessons.length) return { completedCount: 0, totalCount: 0, percent: 0, lastCompletedLessonTitle: '' };

  const lessonIds = allLessons.map((l) => l.id);
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .in('lesson_id', lessonIds);

  const completedIds = new Set((progress ?? []).map((r) => r.lesson_id ?? ''));
  const completedCount = completedIds.size;
  const totalCount = allLessons.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filtered = allLessons.filter((l) => completedIds.has(l.id));
  const lastCompleted = filtered[filtered.length - 1];
  return { completedCount, totalCount, percent, lastCompletedLessonTitle: lastCompleted?.title ?? '' };
}
