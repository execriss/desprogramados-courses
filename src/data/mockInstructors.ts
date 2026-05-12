import type { Instructor } from '../types';

export const mockInstructors: Instructor[] = [
  {
    id: 'inst-1',
    slug: 'sara-montoya',
    name: 'Sara Montoya',
    title: 'Senior Frontend Engineer · Ex Vercel, Shopify',
    shortBio: 'Construyó el sistema de componentes de un unicornio con +8M de usuarios. Ahora enseña lo que nadie explica en los tutoriales.',
    fullBio: `Sara lleva 11 años construyendo interfaces de producción. Pasó 4 años en Vercel trabajando en el núcleo de Next.js y 3 años en Shopify donde lideró la migración de Liquid a React de la plataforma de tiendas.

Ha visto de primera mano cómo fracasan los proyectos React: demasiado estado global, componentes acoplados, caching mal entendido. En sus cursos no hay "todo-apps" ni ejemplos de contador: cada ejercicio es un fragmento real de una codebase que sobrevive al tráfico de producción.

Cuando no está programando, está escalando montañas en los Andes o leyendo código abierto de Radix y Remix.`,
    stats: { coursesCount: 2, studentsCount: 22180, rating: 4.9 },
  },
  {
    id: 'inst-2',
    slug: 'marcos-vidal',
    name: 'Marcos Vidal',
    title: 'Staff Backend Engineer · Ex Stripe, Cloudflare',
    shortBio: 'Diseñó la capa de rate-limiting que procesa 500K req/s en Stripe. Experto en Node.js de alto rendimiento y APIs que no caen.',
    fullBio: `Marcos es ingeniero backend con 12 años de experiencia en sistemas distribuidos y APIs de alto tráfico. Fue Staff Engineer en Stripe durante 5 años, donde diseñó y mantuvo la infraestructura de pagos que procesa millones de transacciones diarias.

Su filosofía: el código más difícil de escribir no es el que arranca, sino el que funciona a las 3 AM cuando el tráfico triplica lo esperado. Todos sus cursos tienen esa mentalidad: observabilidad desde el día 1, manejo de errores explícito y pruebas que realmente detectan bugs en producción.

Fuera del trabajo, contribuye a Fastify y organiza el meetup de Node.js en Madrid.`,
    stats: { coursesCount: 2, studentsCount: 19450, rating: 4.8 },
  },
  {
    id: 'inst-3',
    slug: 'valentina-cruz',
    name: 'Valentina Cruz',
    title: 'Principal Data Engineer · Ex Netflix, Databricks',
    shortBio: 'Construyó pipelines que procesan 2TB diarios en Netflix. Especialista en Python para equipos de datos que quieren código mantenible.',
    fullBio: `Valentina tiene 10 años en el mundo de los datos, con posiciones en Netflix (Data Platform) y Databricks (Developer Experience). Ha visto cómo los equipos de ciencia de datos crean deuda técnica enorme por no aplicar las prácticas de ingeniería de software que los equipos de backend dan por sentadas.

Su misión es entrenar una nueva generación de data engineers que escriban Python del que no te avergüenzas: tipado, testeado, modular. En sus cursos, los pipelines no son notebooks Jupyter: son módulos Python con CI/CD, validación de datos con Pydantic y logging estructurado.

Contribuye activamente a Apache Airflow y habla regularmente en PyCon Latinoamérica.`,
    stats: { coursesCount: 2, studentsCount: 15870, rating: 4.9 },
  },
  {
    id: 'inst-4',
    slug: 'leonardo-ruiz',
    name: 'Leonardo Ruiz',
    title: 'Engineering Lead · Ex GitLab, Nuxt Core Team',
    shortBio: 'Miembro del core team de Nuxt. Lideró equipos de frontend en GitLab durante 4 años construyendo aplicaciones Vue a escala empresarial.',
    fullBio: `Leonardo es miembro activo del core team de Nuxt.js y uno de los maintainers más activos del ecosistema Vue en Latinoamérica. Pasó 4 años en GitLab como Engineering Lead, donde su equipo mantenía más de 200 componentes Vue usados por millones de desarrolladores.

Antes de eso, construyó el frontend de una fintech que llegó a 3 millones de usuarios activos usando Vue 2 y la migró a Vue 3 Composition API sin downtime.

En sus cursos comparte los patrones que aprendió haciendo code reviews a cientos de PRs en GitLab: composables bien diseñados, gestión de estado sin Vuex, y arquitectura de módulos que no colapsa cuando el proyecto crece.`,
    stats: { coursesCount: 2, studentsCount: 11240, rating: 4.8 },
  },
  {
    id: 'inst-5',
    slug: 'emma-johansen',
    name: 'Emma Johansen',
    title: 'Senior Frontend Architect · Google Developer Expert Angular',
    shortBio: 'Google Developer Expert en Angular. Arquitectó aplicaciones enterprise para clientes Fortune 500 con equipos de +30 devs.',
    fullBio: `Emma es Google Developer Expert en Angular y lleva 9 años en el ecosistema. Ha trabajado como consultora para empresas Fortune 500 en Europa y América Latina, construyendo aplicaciones enterprise con equipos de hasta 40 ingenieros.

Fue una de las primeras en adoptar Angular Signals en producción y escribió varios de los artículos más leídos sobre arquitectura de micro-frontends con Angular. Cree que Angular no es "demasiado complejo" — es que la mayoría lo aprende de la manera equivocada.

Sus cursos van directo a lo que importa en entornos corporativos: lazy loading real, gestión de módulos, testing con Jasmine/Karma y estrategias de rendimiento que sobreviven a las auditorías de performance.`,
    stats: { coursesCount: 1, studentsCount: 8650, rating: 4.7 },
  },
  {
    id: 'inst-6',
    slug: 'david-kang',
    name: 'David Kang',
    title: 'Backend Architect · Ex Uber, Neon DB',
    shortBio: 'Diseñó microservicios que manejan 1M de viajes diarios en Uber. Especialista en NestJS y arquitecturas de microservicios en producción.',
    fullBio: `David tiene 10 años de experiencia construyendo sistemas backend distribuidos. En Uber, formó parte del equipo que migró el monolito de dispatch a microservicios, una transición que redujo la latencia P99 de 800ms a 120ms.

Descubrió NestJS en 2019 y desde entonces lo ha adoptado como su framework de elección para proyectos enterprise. Lleva 4 años enseñando arquitecturas de microservicios y ha formado a más de 8.000 ingenieros que ahora trabajan en Mercado Libre, Rappi, Nubank y otras tech companies de la región.

Fuera del trabajo, es DJ los fines de semana y dice que diseñar sistemas de colas y mezclar tracks tienen más en común de lo que parece.`,
    stats: { coursesCount: 1, studentsCount: 8230, rating: 4.8 },
  },
  {
    id: 'inst-7',
    slug: 'nina-volkov',
    name: 'Nina Volkov',
    title: 'Systems Engineer · Ex Google SRE, Cockroach Labs',
    shortBio: 'Ex Google SRE con 8 años en sistemas de alta disponibilidad. Una de las ingenieras de Go más reconocidas de la comunidad open source.',
    fullBio: `Nina pasó 5 años como Site Reliability Engineer en Google, haciendo on-call para servicios que no pueden permitirse más de 4 horas de downtime al año. Luego se unió a Cockroach Labs donde contribuyó al núcleo de la base de datos distribuida escrita en Go.

Es una de las maintainers del proyecto Prometheus y ha dado charlas sobre concurrencia en Go en GopherCon Europe y KubeCon. Cree que Go es el lenguaje que debería aprender cualquier ingeniero que quiera entender cómo funcionan realmente los sistemas modernos.

En sus cursos no hay magia: se abre el profiler, se miden las goroutines, se entiende el scheduler. Puro Go como se usa en producción.`,
    stats: { coursesCount: 2, studentsCount: 13760, rating: 4.9 },
  },
  {
    id: 'inst-8',
    slug: 'carlos-romero',
    name: 'Carlos Romero',
    title: 'Java Platform Lead · Ex Red Hat, JetBrains',
    shortBio: 'Contribuidor de Spring Framework y Quarkus. 13 años construyendo plataformas Java enterprise que dan servicio a millones de usuarios.',
    fullBio: `Carlos es uno de los ingenieros Java más experimentados de la escena hispana. Pasó 6 años en Red Hat contribuyendo a Quarkus y 3 años en JetBrains trabajando en el tooling para el ecosistema JVM.

Ha migrado monolitos Spring Boot a microservicios reactivos, implementado GraalVM native image en producción y enseñado a cientos de equipos a sacarle partido a las últimas versiones de Java. Cree que Java enterprise tiene mala fama injustamente: cuando se hace bien, es imbatible en entornos bancarios y de telecomunicaciones.

Sus cursos son densos, prácticos y pensados para ingenieros que ya saben Java y quieren dar el salto de developer a architect.`,
    stats: { coursesCount: 1, studentsCount: 7890, rating: 4.7 },
  },
];

export function getInstructorById(id: string): Instructor | undefined {
  return mockInstructors.find((i) => i.id === id);
}

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return mockInstructors.find((i) => i.slug === slug);
}
