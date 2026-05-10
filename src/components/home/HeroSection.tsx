import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import '../../styles/components/hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

export function HeroSection() {
  return (
    <section className="hero" aria-label="Inicio">
      <div className="hero__inner">
        <div className="hero__content">
          <motion.div
            className="hero__eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Star size={13} />
            Más de 60.000 desarrolladores confían en nosotros
          </motion.div>

          <motion.h1
            className="hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Domina el desarrollo web moderno — a tu ritmo
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            Cursos prácticos de React, Node, Python, Go y mucho más — creados por ingenieros que trabajan en productos reales.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <Link to="/courses">
              <Button variant="primary" size="lg">
                Ver cursos
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="secondary" size="lg">Ver previsualizaciones gratis</Button>
            </Link>
          </motion.div>

          <motion.div
            className="hero__social-proof"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <div className="hero__stat">
              <span className="hero__stat-value">60k+</span>
              <span className="hero__stat-label">Estudiantes inscritos</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">13</span>
              <span className="hero__stat-label">Instructores expertos</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">4.8</span>
              <span className="hero__stat-label">Valoración media</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
