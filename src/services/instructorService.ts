import { supabase } from '../lib/supabase';
import type { Instructor } from '../types';

type DbInstructor = {
  id: string; slug: string; name: string; title: string;
  short_bio: string; full_bio: string; avatar_url: string | null;
  students_count: number | null; rating: number | null;
};

function mapInstructor(row: DbInstructor, coursesCount = 0): Instructor {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    title: row.title,
    shortBio: row.short_bio,
    fullBio: row.full_bio,
    stats: {
      coursesCount,
      studentsCount: row.students_count ?? 0,
      rating: row.rating ?? 0,
    },
  };
}

export async function getInstructorBySlug(slug: string): Promise<Instructor | null> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  const { count } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('instructor_id', data.id);

  return mapInstructor(data as DbInstructor, count ?? 0);
}

export async function getInstructorById(id: string): Promise<Instructor | null> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapInstructor(data as DbInstructor);
}
