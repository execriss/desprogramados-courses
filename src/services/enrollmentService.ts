import { supabase } from '../lib/supabase';

export async function isEnrolled(courseId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle();

  return !!data;
}

export async function enrollFree(courseId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('enrollments')
    .insert({ user_id: user.id, course_id: courseId });

  if (error && error.code !== '23505') throw error; // ignore unique violation
}

export async function getEnrolledCourses(): Promise<{
  courseId: string;
  enrolledAt: string;
  completedAt: string | null;
}[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('enrollments')
    .select('course_id, enrolled_at, completed_at')
    .eq('user_id', user.id);

  if (error) throw error;
  return (data ?? []).map((r) => ({
    courseId: r.course_id ?? '',
    enrolledAt: r.enrolled_at ?? '',
    completedAt: r.completed_at,
  }));
}
