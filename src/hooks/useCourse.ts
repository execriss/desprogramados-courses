import { useQuery } from '@tanstack/react-query';
import { getCourseBySlug } from '../services/courseService';

export function useCourse(slug: string | undefined) {
  const { data: course = null, isLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => getCourseBySlug(slug!),
    enabled: !!slug,
  });

  return { course, isLoading };
}
