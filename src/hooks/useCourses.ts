import { useState, useMemo, useEffect } from 'react';
import { mockCourses } from '../data/mockCourses';
import { getInstructorById } from '../data/mockInstructors';
import type { Course } from '../types';

type Category = Course['category'] | 'all';
type Level = Course['level'] | 'all';

export function useCourses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [level, setLevel] = useState<Level>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const courses = useMemo(() => {
    if (isLoading) return [];
    return mockCourses.filter((c) => {
      const instructorName = getInstructorById(c.instructorId)?.name ?? '';
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        instructorName.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'all' || c.category === category;
      const matchesLevel = level === 'all' || c.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level, isLoading]);

  return { courses, isLoading, search, setSearch, category, setCategory, level, setLevel };
}
