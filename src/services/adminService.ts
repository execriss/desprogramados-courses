import { supabase } from '../lib/supabase';

const UPLOAD_WORKER = 'https://desprogramados-upload.guinazuexequiel-dev.workers.dev';
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET as string;

// ─── Courses ────────────────────────────────────────────────────────────────

export async function adminGetAllCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, category, level, price, is_published, is_featured, students_count')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminGetCourse(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function adminCreateCourse(values: {
  title: string; slug: string; description: string;
  category: string; level: string; price: number;
  instructor_id: string; thumbnail_url?: string;
}) {
  const { data, error } = await supabase
    .from('courses')
    .insert({ ...values, is_published: false, is_featured: false })
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function adminUpdateCourse(id: string, values: Record<string, unknown>) {
  const { error } = await supabase.from('courses').update(values).eq('id', id);
  if (error) throw error;
}

export async function adminTogglePublished(id: string, published: boolean) {
  const { error } = await supabase.from('courses').update({ is_published: published }).eq('id', id);
  if (error) throw error;
}

// ─── Sections ───────────────────────────────────────────────────────────────

export async function adminGetSections(courseId: string) {
  const { data, error } = await supabase
    .from('sections')
    .select('*, lessons(id, title, duration_min, position, is_preview, video_url)')
    .eq('course_id', courseId)
    .order('position');
  if (error) throw error;
  return data ?? [];
}

export async function adminCreateSection(courseId: string, title: string, position: number) {
  const { data, error } = await supabase
    .from('sections')
    .insert({ course_id: courseId, title, position })
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function adminUpdateSection(id: string, title: string) {
  const { error } = await supabase.from('sections').update({ title }).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteSection(id: string) {
  const { error } = await supabase.from('sections').delete().eq('id', id);
  if (error) throw error;
}

// ─── Lessons ────────────────────────────────────────────────────────────────

export async function adminCreateLesson(sectionId: string, values: {
  title: string; duration_min: number; position: number; is_preview: boolean;
}) {
  const { data, error } = await supabase
    .from('lessons')
    .insert({ section_id: sectionId, ...values })
    .select('id')
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function adminUpdateLesson(id: string, values: Record<string, unknown>) {
  const { error } = await supabase.from('lessons').update(values).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteLesson(id: string) {
  const { error } = await supabase.from('lessons').delete().eq('id', id);
  if (error) throw error;
}

// ─── Video upload ────────────────────────────────────────────────────────────

export async function uploadVideo(
  file: File,
  lessonId: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'mp4';
  const key = `lessons/${lessonId}.${ext}`;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${UPLOAD_WORKER}/${key}`);
    xhr.setRequestHeader('X-Admin-Secret', ADMIN_SECRET);
    xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => (xhr.status === 200 ? resolve() : reject(new Error(`Upload failed: ${xhr.status}`)));
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(file);
  });

  const videoUrl = `https://videos.desprogramados.shop/${key}`;
  await adminUpdateLesson(lessonId, { video_url: videoUrl });
  return videoUrl;
}
