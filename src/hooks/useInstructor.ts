import { useQuery } from '@tanstack/react-query';
import { getInstructorBySlug } from '../services/instructorService';

export function useInstructor(slug: string | undefined) {
  const { data: instructor = null, isLoading } = useQuery({
    queryKey: ['instructor', slug],
    queryFn: () => getInstructorBySlug(slug!),
    enabled: !!slug,
  });

  return { instructor, isLoading };
}
