import type { Course, Testimonial } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'react-en-produccion',
    title: 'React en Producción: Patrones y Arquitectura Real',
    description:
      'Aprende los patrones de componentes, estrategias de caching y arquitecturas que usan los equipos senior. Server Components, concurrent features y flujos de trabajo reales en startups tech.',
    instructor: 'Sara Montoya',
    category: 'react',
    level: 'intermediate',
    price: 89,
    rating: 4.9,
    studentsCount: 14320,
    lessonsCount: 87,
    durationHours: 22.5,
    tags: ['server components', 'arquitectura', 'performance', 'typescript'],
    isFeatured: true,
    learningPoints: [
      'Cuándo usar Server Components — y cuándo evitarlos en producción',
      'Estrategias de caching con fetch nativo: stale-while-revalidate real',
      'Estado global sin sobreingeniería: Zustand como lo usan en Vercel',
      'Memoización correcta: cuándo memo, useCallback y useMemo realmente ayudan',
      'Arquitectura de carpetas que escala de 1 a 50 personas en el equipo',
      'Server Actions y formularios sin librerías externas',
    ],
    curriculum: [
      {
        title: 'Mentalidad de producción',
        lessons: [
          { title: 'Cómo piensan los seniors sobre React', durationMin: 15, isPreview: true },
          { title: 'Setup del proyecto como en Vercel', durationMin: 12, isPreview: true },
          { title: 'Estructura de carpetas que escala', durationMin: 18, isPreview: false },
        ],
      },
      {
        title: 'Arquitectura de componentes',
        lessons: [
          { title: 'Composición vs configuración: cuándo usar cada una', durationMin: 28, isPreview: false },
          { title: 'Estado local vs global: la decisión real', durationMin: 30, isPreview: false },
          { title: 'Memoización: cuándo ayuda y cuándo daña', durationMin: 25, isPreview: false },
        ],
      },
      {
        title: 'Server Components en la práctica',
        lessons: [
          { title: 'El límite cliente/servidor: errores comunes', durationMin: 35, isPreview: false },
          { title: 'Streaming y Suspense en apps reales', durationMin: 28, isPreview: false },
          { title: 'Caching strategies que usan en Vercel', durationMin: 32, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'node-apis-produccion',
    title: 'Node.js como en Producción: APIs que Sobreviven al Tráfico Real',
    description:
      'Diseña y despliega APIs REST como lo hacen los backends de Stripe y Shopify. Rate limiting, caché con Redis, observabilidad, autenticación robusta y deploy en AWS desde el primer día.',
    instructor: 'Marcos Vidal',
    category: 'node',
    level: 'intermediate',
    price: 79,
    rating: 4.8,
    studentsCount: 9870,
    lessonsCount: 65,
    durationHours: 18,
    tags: ['express', 'redis', 'postgresql', 'docker'],
    isFeatured: true,
    learningPoints: [
      'Rate limiting con Redis Sliding Window — como lo implementa Stripe',
      'JWT vs Sessions: la decisión real en APIs con miles de usuarios concurrentes',
      'Connection pooling: evitar el cuello de botella con PostgreSQL en producción',
      'Logging estructurado con correlación de requests para debuggear en producción',
      'Patrones de manejo de errores que evitan los 500s silenciosos',
      'Deploy en AWS ECS con health checks, rollback y zero downtime',
    ],
    curriculum: [
      {
        title: 'El event loop que importa',
        lessons: [
          { title: 'Por qué Node escala — y cuándo no', durationMin: 22, isPreview: true },
          { title: 'Async/await: los errores que cometen todos', durationMin: 18, isPreview: false },
        ],
      },
      {
        title: 'APIs de producción',
        lessons: [
          { title: 'Rate limiting: cómo lo hace Stripe', durationMin: 25, isPreview: false },
          { title: 'JWT vs Sessions: la decisión real', durationMin: 35, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'python-equipos-datos',
    title: 'Python en Equipos de Datos: Del Análisis al Pipeline Profesional',
    description:
      'Cómo trabajan realmente los data engineers en empresas. Pandas, validación de datos con Pydantic, pipelines reproducibles con Prefect y primeros pasos con modelos en producción.',
    instructor: 'Valentina Cruz',
    category: 'python',
    level: 'beginner',
    price: 69,
    rating: 4.7,
    studentsCount: 22100,
    lessonsCount: 94,
    durationHours: 28,
    tags: ['pandas', 'pydantic', 'prefect', 'scikit-learn'],
    isFeatured: true,
    learningPoints: [
      'Gestión de entornos con uv — el estándar moderno en equipos de datos',
      'Type hints que realmente previenen bugs en pipelines de datos críticos',
      'Validación robusta con Pydantic v2 en ingestión de datos externos',
      'Las operaciones de Pandas que usas el 80% del tiempo (y cómo hacerlas rápido)',
      'Pipelines reproducibles con versionado de datos y experimentos',
      'Integrar y servir modelos de scikit-learn en APIs reales con FastAPI',
    ],
    curriculum: [
      {
        title: 'Python como los data engineers',
        lessons: [
          { title: 'Entornos virtuales y gestión de dependencias real', durationMin: 20, isPreview: true },
          { title: 'Type hints: no optional en código de equipo', durationMin: 25, isPreview: false },
          { title: 'Testing de funciones de datos', durationMin: 30, isPreview: false },
        ],
      },
      {
        title: 'Análisis en producción',
        lessons: [
          { title: 'Pandas: las operaciones que usas el 80% del tiempo', durationMin: 35, isPreview: false },
          { title: 'Validación de datos con Pydantic', durationMin: 40, isPreview: false },
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'vue3-en-produccion',
    title: 'Vue 3 en Producción: Composition API y Arquitectura Escalable',
    description:
      'Vue 3 como lo usan los equipos profesionales. Composition API a fondo, gestión de estado con Pinia, testing con Vitest y patrones de arquitectura que escalan sin volverse inmanejables.',
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
    slug: 'angular-enterprise-produccion',
    title: 'Angular Enterprise: Signals, Rendimiento y Arquitectura que Escala',
    description:
      'La arquitectura Angular de aplicaciones que manejan millones de usuarios. Signals, lazy loading estratégico, RxJS avanzado sin antipatrones y testing en pipelines de CI/CD reales.',
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
    slug: 'nestjs-microservicios-industria',
    title: 'NestJS: Microservicios como se Hacen en la Industria',
    description:
      'Diseña sistemas distribuidos con NestJS tal como lo hacen los equipos de backend senior. RabbitMQ, transacciones distribuidas, observabilidad con OpenTelemetry y deploy en Kubernetes.',
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
    slug: 'go-en-produccion',
    title: 'Go en Producción: Concurrencia, Performance y APIs de Alta Carga',
    description:
      'Go como herramienta de producción real — concurrencia sin carreras de datos, profiling, optimización de memoria y construcción de servicios que manejan miles de requests por segundo.',
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
    slug: 'spring-boot-produccion',
    title: 'Spring Boot en Producción: Seguridad, Caché y Deploy en AWS',
    description:
      'Spring Boot de los proyectos enterprise reales. OAuth2 y JWT bien implementados, optimización de queries JPA, caché con Redis, monitoreo con Actuator y deploy en AWS desde cero.',
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
    slug: 'react-native-produccion',
    title: 'React Native en Producción: Apps Móviles que se Publican y Mantienen',
    description:
      'Construye apps móviles listas para la App Store y Google Play. Las mismas prácticas que usan equipos de producto: CI/CD con EAS, OTA updates, testing automatizado y manejo de versiones.',
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
    slug: 'fastapi-produccion',
    title: 'FastAPI en Producción: APIs Async con Python como en las Empresas',
    description:
      'FastAPI como lo usan equipos de backend reales. Async sin errores sutiles, autenticación OAuth2, rate limiting, versionado de API y deploy en AWS Lambda con costos mínimos.',
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
    slug: 'nuxt3-fullstack-produccion',
    title: 'Nuxt 3 en Producción: Full-Stack con SSR y Edge Functions',
    description:
      'Nuxt 3 como lo usan equipos de producto. SSR estratégico vs SSG vs ISR según el caso de uso, server routes como microservicios, Prisma en producción y deploy en Vercel Edge.',
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
    slug: 'websockets-produccion',
    title: 'WebSockets en Producción: Cómo lo Hacen Figma, Notion y Linear',
    description:
      'La arquitectura real detrás de los features colaborativos que más usas. Socket.IO con Redis Adapter, horizontal scaling, conflict resolution y las decisiones que toman los equipos de plataforma.',
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
    slug: 'go-kubernetes-produccion',
    title: 'Go y Kubernetes: Microservicios Cloud-Native como los Equipos SRE',
    description:
      'Despliega microservicios Go como lo hacen los equipos de plataforma. Helm charts, service mesh con Istio, observabilidad con Prometheus y Grafana, y pipelines de CD con ArgoCD.',
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
    text: 'El curso de React no solo me enseñó hooks — me enseñó cuándo NO usarlos y qué patrón elegir cuando tu app escala. Eso no lo encuentras en ningún tutorial de YouTube.',
    course: 'React en Producción: Patrones y Arquitectura Real',
  },
  {
    id: '2',
    name: 'Priya Nair',
    role: 'Desarrolladora Full-Stack en Vercel',
    text: 'Pasé de escribir Go por mi cuenta a entender cómo lo usan los equipos de plataforma. Las decisiones de concurrencia y profiling son exactamente lo que necesitaba para el trabajo.',
    course: 'Go en Producción: Concurrencia, Performance y APIs de Alta Carga',
  },
  {
    id: '3',
    name: 'Alejandro Torres',
    role: 'Ingeniero Backend en Shopify',
    text: 'Ningún otro curso te explica por qué RabbitMQ aquí y no Kafka, o cuándo usar transacciones distribuidas. Ese contexto es lo que diferencia a un junior de un senior.',
    course: 'NestJS: Microservicios como se Hacen en la Industria',
  },
];
