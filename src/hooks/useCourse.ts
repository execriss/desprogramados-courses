import { useState, useEffect } from 'react';
import { mockCourses } from '../data/mockCourses';
import type { Course } from '../types';

export function useCourse(slug: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setCourse(mockCourses.find((c) => c.slug === slug) ?? null);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [slug]);

  return { course, isLoading };
}
