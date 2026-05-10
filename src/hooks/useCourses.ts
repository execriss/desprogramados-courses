import { useState, useMemo } from 'react';
import { mockCourses } from '../data/mockCourses';
import type { Course } from '../types';

type Category = Course['category'] | 'all';
type Level = Course['level'] | 'all';

export function useCourses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [level, setLevel] = useState<Level>('all');

  const filtered = useMemo(() => {
    return mockCourses.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'all' || c.category === category;
      const matchesLevel = level === 'all' || c.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  return { courses: filtered, search, setSearch, category, setCategory, level, setLevel };
}
