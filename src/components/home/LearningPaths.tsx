import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/components/sections.css';

const paths = [
  { id: 'react', icon: '⚛️', name: 'React', count: 3, bg: '#DBEAFE' },
  { id: 'node', icon: '🟢', name: 'Node.js', count: 2, bg: '#DCFCE7' },
  { id: 'python', icon: '🐍', name: 'Python', count: 2, bg: '#FEF9C3' },
  { id: 'vue', icon: '💚', name: 'Vue', count: 2, bg: '#D1FAE5' },
  { id: 'angular', icon: '🔴', name: 'Angular', count: 1, bg: '#FEE2E2' },
  { id: 'nest', icon: '🐈', name: 'NestJS', count: 1, bg: '#FCE7F3' },
  { id: 'go', icon: '🐹', name: 'Go', count: 2, bg: '#E0F2FE' },
  { id: 'java', icon: '☕', name: 'Java', count: 1, bg: '#FEF3C7' },
];

export function LearningPaths() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Rutas de aprendizaje</p>
          <h2 className="section__title">Elige tu stack</h2>
          <p className="section__subtitle">Cada ruta enseña la tecnología como se usa en entornos laborales reales — flujos de trabajo, decisiones y patrones de equipos senior.</p>
        </div>

        <div className="learning-paths__grid">
          {paths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/courses?category=${path.id}`}
                className="path-card"
              >
                <div
                  className="path-card__icon"
                  style={{ backgroundColor: path.bg }}
                  aria-hidden="true"
                >
                  {path.icon}
                </div>
                <p className="path-card__name">{path.name}</p>
                <p className="path-card__count">{path.count} curso{path.count !== 1 ? 's' : ''}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
