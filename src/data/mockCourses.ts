import type { Course, Testimonial } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'react-19-complete-guide',
    title: 'React 19 — The Complete Modern Guide',
    description:
      'Master React 19 with hooks, server components, concurrent features, and modern patterns. Build production-ready apps from scratch.',
    instructor: 'Sarah Chen',
    category: 'react',
    level: 'intermediate',
    price: 89,
    rating: 4.9,
    studentsCount: 14320,
    lessonsCount: 87,
    durationHours: 22.5,
    tags: ['hooks', 'server components', 'typescript', 'vite'],
    isFeatured: true,
    curriculum: [
      {
        title: 'Getting Started',
        lessons: [
          { title: 'Course Overview', durationMin: 5, isPreview: true },
          { title: 'Setting Up Your Environment', durationMin: 12, isPreview: true },
          { title: 'Your First React Component', durationMin: 18, isPreview: false },
        ],
      },
      {
        title: 'Core Concepts',
        lessons: [
          { title: 'JSX Deep Dive', durationMin: 25, isPreview: false },
          { title: 'Props and State', durationMin: 30, isPreview: false },
          { title: 'Event Handling', durationMin: 20, isPreview: false },
        ],
      },
      {
        title: 'Advanced Hooks',
        lessons: [
          { title: 'useEffect Mastery', durationMin: 35, isPreview: false },
          { title: 'useContext and useReducer', durationMin: 28, isPreview: false },
          { title: 'Custom Hooks', durationMin: 32, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'node-backend-mastery',
    title: 'Node.js Backend Mastery: APIs That Scale',
    description:
      'Build robust REST and GraphQL APIs with Node.js, Express, and PostgreSQL. Learn authentication, caching, and deployment best practices.',
    instructor: 'Marcus Webb',
    category: 'node',
    level: 'intermediate',
    price: 79,
    rating: 4.8,
    studentsCount: 9870,
    lessonsCount: 65,
    durationHours: 18,
    tags: ['express', 'graphql', 'postgresql', 'docker'],
    isFeatured: true,
    curriculum: [
      {
        title: 'Node.js Fundamentals',
        lessons: [
          { title: 'Event Loop Deep Dive', durationMin: 22, isPreview: true },
          { title: 'Modules and Packages', durationMin: 18, isPreview: false },
        ],
      },
      {
        title: 'Building APIs',
        lessons: [
          { title: 'REST Design Principles', durationMin: 25, isPreview: false },
          { title: 'Authentication with JWT', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'python-data-science-bootcamp',
    title: 'Python for Data Science: From Zero to ML',
    description:
      'Comprehensive Python course covering pandas, NumPy, visualization, and an intro to machine learning with scikit-learn.',
    instructor: 'Aisha Patel',
    category: 'python',
    level: 'beginner',
    price: 69,
    rating: 4.7,
    studentsCount: 22100,
    lessonsCount: 94,
    durationHours: 28,
    tags: ['pandas', 'numpy', 'matplotlib', 'scikit-learn'],
    isFeatured: true,
    curriculum: [
      {
        title: 'Python Basics',
        lessons: [
          { title: 'Variables and Data Types', durationMin: 20, isPreview: true },
          { title: 'Control Flow', durationMin: 25, isPreview: false },
          { title: 'Functions and Scope', durationMin: 30, isPreview: false },
        ],
      },
      {
        title: 'Data Analysis',
        lessons: [
          { title: 'Intro to Pandas', durationMin: 35, isPreview: false },
          { title: 'Data Cleaning', durationMin: 40, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'vue3-composition-api',
    title: 'Vue 3 with Composition API & Pinia',
    description:
      'Learn Vue 3 the right way. Deep dive into the Composition API, TypeScript integration, and modern state management with Pinia.',
    instructor: 'Leo Martinez',
    category: 'vue',
    level: 'intermediate',
    price: 74,
    rating: 4.8,
    studentsCount: 6540,
    lessonsCount: 58,
    durationHours: 16,
    tags: ['composition api', 'pinia', 'typescript', 'vite'],
    curriculum: [
      {
        title: 'Vue 3 Fundamentals',
        lessons: [
          { title: 'Options vs Composition API', durationMin: 20, isPreview: true },
          { title: 'Reactivity System', durationMin: 28, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'angular-enterprise-apps',
    title: 'Angular 17: Enterprise Application Architecture',
    description:
      'Build scalable enterprise Angular applications with signals, standalone components, RxJS best practices, and NgRx.',
    instructor: 'Emma Johansson',
    category: 'angular',
    level: 'advanced',
    price: 94,
    rating: 4.6,
    studentsCount: 4210,
    lessonsCount: 72,
    durationHours: 20,
    tags: ['signals', 'rxjs', 'ngrx', 'standalone'],
    curriculum: [
      {
        title: 'Modern Angular',
        lessons: [
          { title: 'Standalone Components', durationMin: 22, isPreview: true },
          { title: 'Angular Signals', durationMin: 30, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '6',
    slug: 'nestjs-microservices',
    title: 'NestJS: Microservices & Clean Architecture',
    description:
      'Design production-grade microservices with NestJS, RabbitMQ, and clean architecture patterns. Includes Docker and Kubernetes.',
    instructor: 'David Kim',
    category: 'nest',
    level: 'advanced',
    price: 99,
    rating: 4.9,
    studentsCount: 3870,
    lessonsCount: 61,
    durationHours: 19.5,
    tags: ['microservices', 'rabbitmq', 'docker', 'kubernetes'],
    curriculum: [
      {
        title: 'NestJS Core',
        lessons: [
          { title: 'Modules, Providers, Controllers', durationMin: 25, isPreview: true },
          { title: 'Dependency Injection', durationMin: 30, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '7',
    slug: 'go-systems-programming',
    title: 'Go: Systems Programming & High Performance APIs',
    description:
      'Learn Go from the ground up — concurrency, goroutines, channels, and building blazing-fast web services with Gin and GORM.',
    instructor: 'Nina Volkov',
    category: 'go',
    level: 'intermediate',
    price: 84,
    rating: 4.8,
    studentsCount: 5130,
    lessonsCount: 55,
    durationHours: 15,
    tags: ['goroutines', 'channels', 'gin', 'gorm'],
    curriculum: [
      {
        title: 'Go Fundamentals',
        lessons: [
          { title: 'Types and Interfaces', durationMin: 25, isPreview: true },
          { title: 'Goroutines and Channels', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '8',
    slug: 'java-spring-boot',
    title: 'Java & Spring Boot 3: Professional Development',
    description:
      'The most complete Java and Spring Boot course. REST APIs, Spring Security, JPA/Hibernate, and cloud deployment on AWS.',
    instructor: 'Carlos Ruiz',
    category: 'java',
    level: 'beginner',
    price: 79,
    rating: 4.7,
    studentsCount: 18700,
    lessonsCount: 110,
    durationHours: 35,
    tags: ['spring boot', 'jpa', 'spring security', 'aws'],
    curriculum: [
      {
        title: 'Java Essentials',
        lessons: [
          { title: 'OOP Principles', durationMin: 30, isPreview: true },
          { title: 'Collections Framework', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '9',
    slug: 'react-native-mobile',
    title: 'React Native: Ship iOS & Android Apps',
    description:
      'Build cross-platform mobile apps with React Native and Expo. Navigation, animations, push notifications, and App Store deployment.',
    instructor: 'Sarah Chen',
    category: 'react',
    level: 'intermediate',
    price: 84,
    rating: 4.7,
    studentsCount: 8920,
    lessonsCount: 78,
    durationHours: 24,
    tags: ['expo', 'navigation', 'animations', 'app store'],
    curriculum: [
      {
        title: 'React Native Basics',
        lessons: [
          { title: 'Components and Styling', durationMin: 22, isPreview: true },
          { title: 'React Navigation', durationMin: 28, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '10',
    slug: 'python-fastapi',
    title: 'FastAPI: Modern Python Web APIs',
    description:
      'Build ultra-fast APIs with Python and FastAPI. Automatic OpenAPI docs, async support, Pydantic validation, and PostgreSQL.',
    instructor: 'Aisha Patel',
    category: 'python',
    level: 'intermediate',
    price: 72,
    rating: 4.9,
    studentsCount: 7640,
    lessonsCount: 52,
    durationHours: 14.5,
    tags: ['fastapi', 'async', 'pydantic', 'sqlalchemy'],
    curriculum: [
      {
        title: 'FastAPI Fundamentals',
        lessons: [
          { title: 'Path Operations & Type Hints', durationMin: 20, isPreview: true },
          { title: 'Dependency Injection', durationMin: 25, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '11',
    slug: 'vue-nuxt-fullstack',
    title: 'Full-Stack with Nuxt 3 & Vue 3',
    description:
      'Create full-stack web apps with Nuxt 3. SSR, SSG, API routes, Nitro server, and Prisma for the database layer.',
    instructor: 'Leo Martinez',
    category: 'vue',
    level: 'advanced',
    price: 89,
    rating: 4.6,
    studentsCount: 3290,
    lessonsCount: 63,
    durationHours: 18,
    tags: ['nuxt', 'ssr', 'nitro', 'prisma'],
    curriculum: [
      {
        title: 'Nuxt 3 Setup',
        lessons: [
          { title: 'File-based Routing', durationMin: 18, isPreview: true },
          { title: 'Data Fetching', durationMin: 25, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '12',
    slug: 'node-realtime-apps',
    title: 'Real-Time Apps with Node.js & Socket.IO',
    description:
      'Build real-time chat apps, collaborative tools, and live dashboards with Node.js, Socket.IO, Redis, and React.',
    instructor: 'Marcus Webb',
    category: 'node',
    level: 'intermediate',
    price: 76,
    rating: 4.8,
    studentsCount: 5820,
    lessonsCount: 48,
    durationHours: 13.5,
    tags: ['socket.io', 'redis', 'websockets', 'react'],
    curriculum: [
      {
        title: 'WebSockets Foundation',
        lessons: [
          { title: 'HTTP vs WebSocket Protocol', durationMin: 15, isPreview: true },
          { title: 'Socket.IO Basics', durationMin: 22, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '13',
    slug: 'go-kubernetes',
    title: 'Go & Kubernetes: Cloud-Native Development',
    description:
      'Deploy Go microservices on Kubernetes. Helm charts, service mesh with Istio, observability, and CI/CD pipelines.',
    instructor: 'Nina Volkov',
    category: 'go',
    level: 'advanced',
    price: 104,
    rating: 4.7,
    studentsCount: 2760,
    lessonsCount: 67,
    durationHours: 21,
    tags: ['kubernetes', 'helm', 'istio', 'ci/cd'],
    curriculum: [
      {
        title: 'Kubernetes Basics',
        lessons: [
          { title: 'Pods, Services, Deployments', durationMin: 30, isPreview: true },
          { title: 'ConfigMaps and Secrets', durationMin: 22, isPreview: false },
        ],
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jordan Mills',
    role: 'Senior Frontend Engineer at Stripe',
    text: 'The React 19 course completely changed how I think about component architecture. The server components section alone was worth the price.',
    course: 'React 19 — The Complete Modern Guide',
  },
  {
    id: '2',
    name: 'Priya Nair',
    role: 'Full-Stack Developer at Vercel',
    text: 'I went from knowing nothing about Go to shipping a production API in 8 weeks. The concurrency lessons are incredibly well-structured.',
    course: 'Go: Systems Programming & High Performance APIs',
  },
  {
    id: '3',
    name: 'Alex Thornton',
    role: 'Backend Engineer at Shopify',
    text: "NestJS microservices course is the most practical course I've taken. Real-world examples, no fluff. Deployed my first microservice architecture in a month.",
    course: 'NestJS: Microservices & Clean Architecture',
  },
];
