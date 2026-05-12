import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../services/courseService';
import type { Course } from '../types';

type Category = Course['category'] | 'all';
type Level = Course['level'] | 'all';

export function useCourses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [level, setLevel] = useState<Level>('all');

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', { search, category, level }],
    queryFn: () => getCourses({
      search: search || undefined,
      category: category !== 'all' ? category : undefined,
      level: level !== 'all' ? level : undefined,
    }),
  });

  return { courses, isLoading, search, setSearch, category, setCategory, level, setLevel };
}
