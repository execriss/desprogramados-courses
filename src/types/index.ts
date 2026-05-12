export interface Lesson {
  id?: string;
  title: string;
  durationMin: number;
  isPreview: boolean;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  slug: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  stats: {
    coursesCount: number;
    studentsCount: number;
    rating: number;
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructorId: string;
  category: 'react' | 'node' | 'python' | 'vue' | 'angular' | 'nest' | 'go' | 'java';
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  durationHours: number;
  thumbnail?: string;
  tags: string[];
  learningPoints?: string[];
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
