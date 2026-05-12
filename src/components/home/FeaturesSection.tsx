import { motion } from 'framer-motion';
import { Layers, GitBranch, Users } from 'lucide-react';
import '../../styles/components/sections.css';

const features = [
  {
    icon: <Layers size={22} />,
    title: 'Patrones de producción, no de tutorial',
    text: 'Enseñamos las arquitecturas y decisiones que usan equipos reales — no los ejemplos simplificados que nunca llegan a un entorno laboral.',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'El "por qué" detrás del código',
    text: '¿Por qué Redis aquí? ¿Cuándo NO usar microservicios? Cada decisión técnica se explica con el contexto que ningun tutorial te da.',
  },
  {
    icon: <Users size={22} />,
    title: 'Instructores activos en la industria',
    text: 'Cada instructor trabaja hoy en equipos de ingeniería. Lo que enseñan es exactamente lo que hacen en su trabajo diario.',
  },
];

export function FeaturesSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Por qué LearnCraft</p>
          <h2 className="section__title">Cursos orientados al trabajo real</h2>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-block"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="feature-block__icon" aria-hidden="true">
                {f.icon}
              </div>
              <div className="feature-block__content">
                <h3 className="feature-block__title">{f.title}</h3>
                <p className="feature-block__text">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
