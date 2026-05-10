import type { Course, Testimonial } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'react-19-guia-completa',
    title: 'React 19 — Guía Completa y Moderna',
    description:
      'Domina React 19 con hooks, componentes de servidor, características concurrentes y patrones modernos. Construye aplicaciones listas para producción desde cero.',
    instructor: 'Sara Montoya',
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
        title: 'Primeros pasos',
        lessons: [
          { title: 'Resumen del curso', durationMin: 5, isPreview: true },
          { title: 'Configuración del entorno', durationMin: 12, isPreview: true },
          { title: 'Tu primer componente React', durationMin: 18, isPreview: false },
        ],
      },
      {
        title: 'Conceptos fundamentales',
        lessons: [
          { title: 'JSX en profundidad', durationMin: 25, isPreview: false },
          { title: 'Props y estado', durationMin: 30, isPreview: false },
          { title: 'Manejo de eventos', durationMin: 20, isPreview: false },
        ],
      },
      {
        title: 'Hooks avanzados',
        lessons: [
          { title: 'Dominio de useEffect', durationMin: 35, isPreview: false },
          { title: 'useContext y useReducer', durationMin: 28, isPreview: false },
          { title: 'Hooks personalizados', durationMin: 32, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'node-backend-profesional',
    title: 'Node.js Backend Profesional: APIs que Escalan',
    description:
      'Construye APIs REST y GraphQL robustas con Node.js, Express y PostgreSQL. Aprende autenticación, caché y buenas prácticas de despliegue.',
    instructor: 'Marcos Vidal',
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
        title: 'Fundamentos de Node.js',
        lessons: [
          { title: 'El event loop a fondo', durationMin: 22, isPreview: true },
          { title: 'Módulos y paquetes', durationMin: 18, isPreview: false },
        ],
      },
      {
        title: 'Construyendo APIs',
        lessons: [
          { title: 'Principios de diseño REST', durationMin: 25, isPreview: false },
          { title: 'Autenticación con JWT', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'python-ciencia-datos',
    title: 'Python para Ciencia de Datos: De Cero a ML',
    description:
      'Curso completo de Python con pandas, NumPy, visualización e introducción al machine learning con scikit-learn.',
    instructor: 'Valentina Cruz',
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
        title: 'Fundamentos de Python',
        lessons: [
          { title: 'Variables y tipos de datos', durationMin: 20, isPreview: true },
          { title: 'Control de flujo', durationMin: 25, isPreview: false },
          { title: 'Funciones y alcance', durationMin: 30, isPreview: false },
        ],
      },
      {
        title: 'Análisis de datos',
        lessons: [
          { title: 'Introducción a Pandas', durationMin: 35, isPreview: false },
          { title: 'Limpieza de datos', durationMin: 40, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'vue3-composition-api',
    title: 'Vue 3 con Composition API y Pinia',
    description:
      'Aprende Vue 3 como se debe. Inmersión en la Composition API, integración con TypeScript y gestión de estado moderna con Pinia.',
    instructor: 'Leonardo Ruiz',
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
        title: 'Fundamentos de Vue 3',
        lessons: [
          { title: 'Options API vs Composition API', durationMin: 20, isPreview: true },
          { title: 'Sistema de reactividad', durationMin: 28, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'angular-aplicaciones-enterprise',
    title: 'Angular 17: Arquitectura para Aplicaciones Enterprise',
    description:
      'Construye aplicaciones Angular escalables con signals, componentes standalone, mejores prácticas de RxJS y NgRx.',
    instructor: 'Emma Johansen',
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
        title: 'Angular moderno',
        lessons: [
          { title: 'Componentes standalone', durationMin: 22, isPreview: true },
          { title: 'Angular Signals', durationMin: 30, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '6',
    slug: 'nestjs-microservicios',
    title: 'NestJS: Microservicios y Arquitectura Limpia',
    description:
      'Diseña microservicios de producción con NestJS, RabbitMQ y patrones de arquitectura limpia. Incluye Docker y Kubernetes.',
    instructor: 'David Kang',
    category: 'nest',
    level: 'advanced',
    price: 99,
    rating: 4.9,
    studentsCount: 3870,
    lessonsCount: 61,
    durationHours: 19.5,
    tags: ['microservicios', 'rabbitmq', 'docker', 'kubernetes'],
    curriculum: [
      {
        title: 'Núcleo de NestJS',
        lessons: [
          { title: 'Módulos, Providers y Controladores', durationMin: 25, isPreview: true },
          { title: 'Inyección de dependencias', durationMin: 30, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '7',
    slug: 'go-apis-alto-rendimiento',
    title: 'Go: Programación de Sistemas y APIs de Alto Rendimiento',
    description:
      'Aprende Go desde cero — concurrencia, goroutines, canales y construcción de servicios web ultrarrápidos con Gin y GORM.',
    instructor: 'Nina Volkov',
    category: 'go',
    level: 'intermediate',
    price: 84,
    rating: 4.8,
    studentsCount: 5130,
    lessonsCount: 55,
    durationHours: 15,
    tags: ['goroutines', 'canales', 'gin', 'gorm'],
    curriculum: [
      {
        title: 'Fundamentos de Go',
        lessons: [
          { title: 'Tipos e interfaces', durationMin: 25, isPreview: true },
          { title: 'Goroutines y canales', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '8',
    slug: 'java-spring-boot',
    title: 'Java y Spring Boot 3: Desarrollo Profesional',
    description:
      'El curso más completo de Java y Spring Boot. APIs REST, Spring Security, JPA/Hibernate y despliegue en la nube con AWS.',
    instructor: 'Carlos Romero',
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
        title: 'Esenciales de Java',
        lessons: [
          { title: 'Principios de POO', durationMin: 30, isPreview: true },
          { title: 'Framework de Colecciones', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '9',
    slug: 'react-native-apps-moviles',
    title: 'React Native: Publica en iOS y Android',
    description:
      'Construye apps multiplataforma con React Native y Expo. Navegación, animaciones, notificaciones push y publicación en App Store.',
    instructor: 'Sara Montoya',
    category: 'react',
    level: 'intermediate',
    price: 84,
    rating: 4.7,
    studentsCount: 8920,
    lessonsCount: 78,
    durationHours: 24,
    tags: ['expo', 'navegación', 'animaciones', 'app store'],
    curriculum: [
      {
        title: 'Bases de React Native',
        lessons: [
          { title: 'Componentes y estilos', durationMin: 22, isPreview: true },
          { title: 'React Navigation', durationMin: 28, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '10',
    slug: 'python-fastapi',
    title: 'FastAPI: APIs Web Modernas con Python',
    description:
      'Construye APIs ultrarrápidas con Python y FastAPI. Documentación OpenAPI automática, soporte async, validación Pydantic y PostgreSQL.',
    instructor: 'Valentina Cruz',
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
        title: 'Fundamentos de FastAPI',
        lessons: [
          { title: 'Operaciones de ruta y type hints', durationMin: 20, isPreview: true },
          { title: 'Inyección de dependencias', durationMin: 25, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '11',
    slug: 'vue-nuxt-fullstack',
    title: 'Full-Stack con Nuxt 3 y Vue 3',
    description:
      'Crea aplicaciones web full-stack con Nuxt 3. SSR, SSG, rutas de API, servidor Nitro y Prisma para la capa de base de datos.',
    instructor: 'Leonardo Ruiz',
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
        title: 'Configuración de Nuxt 3',
        lessons: [
          { title: 'Enrutamiento basado en archivos', durationMin: 18, isPreview: true },
          { title: 'Fetching de datos', durationMin: 25, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '12',
    slug: 'node-apps-tiempo-real',
    title: 'Apps en Tiempo Real con Node.js y Socket.IO',
    description:
      'Construye chats en tiempo real, herramientas colaborativas y dashboards en vivo con Node.js, Socket.IO, Redis y React.',
    instructor: 'Marcos Vidal',
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
        title: 'Base de WebSockets',
        lessons: [
          { title: 'Protocolo HTTP vs WebSocket', durationMin: 15, isPreview: true },
          { title: 'Fundamentos de Socket.IO', durationMin: 22, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '13',
    slug: 'go-kubernetes',
    title: 'Go y Kubernetes: Desarrollo Cloud-Native',
    description:
      'Despliega microservicios Go en Kubernetes. Helm charts, service mesh con Istio, observabilidad y pipelines de CI/CD.',
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
        title: 'Bases de Kubernetes',
        lessons: [
          { title: 'Pods, Services y Deployments', durationMin: 30, isPreview: true },
          { title: 'ConfigMaps y Secrets', durationMin: 22, isPreview: false },
        ],
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jordán Millán',
    role: 'Ingeniero Frontend Senior en Stripe',
    text: 'El curso de React 19 cambió completamente cómo pienso en la arquitectura de componentes. Solo la sección de server components ya valió el precio.',
    course: 'React 19 — Guía Completa y Moderna',
  },
  {
    id: '2',
    name: 'Priya Nair',
    role: 'Desarrolladora Full-Stack en Vercel',
    text: 'Pasé de no saber nada de Go a publicar una API en producción en 8 semanas. Las lecciones de concurrencia están increíblemente bien estructuradas.',
    course: 'Go: Programación de Sistemas y APIs de Alto Rendimiento',
  },
  {
    id: '3',
    name: 'Alejandro Torres',
    role: 'Ingeniero Backend en Shopify',
    text: 'El curso de microservicios con NestJS es lo más práctico que he tomado. Ejemplos del mundo real, sin relleno. Desplegué mi primera arquitectura de microservicios en un mes.',
    course: 'NestJS: Microservicios y Arquitectura Limpia',
  },
];
