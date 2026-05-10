export interface Lesson {
  title: string;
  durationMin: number;
  isPreview: boolean;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  category: 'react' | 'node' | 'python' | 'vue' | 'angular' | 'nest' | 'go' | 'java';
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  durationHours: number;
  thumbnail?: string;
  tags: string[];
  curriculum: Section[];
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar?: string;
  course: string;
}

export type Theme = 'light' | 'dark';
