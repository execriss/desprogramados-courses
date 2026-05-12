import { supabase } from '../lib/supabase';
import type { Course, Section, Lesson } from '../types';

type DbCourse = {
  id: string; slug: string; title: string; description: string;
  instructor_id: string | null; category: string; level: string;
  price: number; rating: number | null; students_count: number | null;
  lessons_count: number | null; duration_hours: number | null;
  thumbnail_url: string | null; tags: string[] | null;
  learning_points: string[] | null; is_featured: boolean | null;
  is_published: boolean | null;
  instructors?: { name: string } | null;
};

function mapCourse(row: DbCourse): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    instructorId: row.instructor_id ?? '',
    instructorName: row.instructors?.name,
    category: row.category as Course['category'],
    level: row.level as Course['level'],
    price: row.price,
    rating: row.rating ?? 0,
    studentsCount: row.students_count ?? 0,
    lessonsCount: row.lessons_count ?? 0,
    durationHours: row.duration_hours ?? 0,
    thumbnail: row.thumbnail_url ?? undefined,
    tags: row.tags ?? [],
    learningPoints: row.learning_points ?? [],
    isFeatured: row.is_featured ?? false,
    curriculum: [],
  };
}

interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
}

export async function getCourses(filters?: CourseFilters): Promise<Course[]> {
  let query = supabase.from('courses').select('*, instructors(name)').eq('is_published', true);

  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }
  if (filters?.level && filters.level !== 'all') {
    query = query.eq('level', filters.level);
  }
  if (filters?.search) {
    const { data: matchingInstructors } = await supabase
      .from('instructors')
      .select('id')
      .ilike('name', `%${filters.search}%`);
    const ids = (matchingInstructors ?? []).map((i: { id: string }) => i.id);
    if (ids.length > 0) {
      query = query.or(`title.ilike.%${filters.search}%,instructor_id.in.(${ids.join(',')})`);
    } else {
      query = query.ilike('title', `%${filters.search}%`);
    }
  }

  const { data, error } = await query.order('is_featured', { ascending: false });
  if (error) throw error;
  return (data as DbCourse[]).map(mapCourse);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const { data: courseRow, error } = await supabase
    .from('courses')
    .select('*, instructors(name)')
    .eq('slug', slug)
    .single();

  if (error || !courseRow) return null;

  const { data: sections } = await supabase
    .from('sections')
    .select('*, lessons(*)')
    .eq('course_id', courseRow.id)
    .order('position');

  const curriculum: Section[] = (sections ?? []).map((sec: {
    id: string; title: string; position: number;
    lessons: { id: string; title: string; duration_min: number; position: number; is_preview: boolean | null }[];
  }) => ({
    title: sec.title,
    lessons: (sec.lessons ?? [])
      .sort((a, b) => a.position - b.position)
      .map((l): Lesson => ({
        id: l.id,
        title: l.title,
        durationMin: l.duration_min,
        isPreview: l.is_preview ?? false,
      })),
  }));

  const course = mapCourse(courseRow as DbCourse);
  course.curriculum = curriculum;
  return course;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select('*, instructors(name)')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapCourse(data as DbCourse);
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*, instructors(name)')
    .eq('is_featured', true)
    .eq('is_published', true)
    .limit(6);

  if (error) throw error;
  return (data as DbCourse[]).map(mapCourse);
}
