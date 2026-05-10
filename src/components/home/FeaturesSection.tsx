import { motion } from 'framer-motion';
import { Zap, BookOpen, Award } from 'lucide-react';
import '../../styles/components/sections.css';

const features = [
  {
    icon: <Zap size={22} />,
    title: 'Aprende construyendo',
    text: 'Cada curso gira en torno a un proyecto real. Escribes código desde la primera lección — sin ejemplos de juguete, sin relleno.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Curado, no inflado',
    text: 'Eliminamos la redundancia sin piedad. Cada lección justifica su lugar. Termina cursos en días, no en meses.',
  },
  {
    icon: <Award size={22} />,
    title: 'Instructores de la industria',
    text: 'Enseñado por ingenieros de Stripe, Vercel y Shopify — personas que usan estas herramientas en producción cada día.',
  },
];

export function FeaturesSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Por qué LearnCraft</p>
          <h2 className="section__title">Creado para desarrolladores que entregan</h2>
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
