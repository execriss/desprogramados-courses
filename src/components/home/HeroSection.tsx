import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Clock, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import '../../styles/components/hero.css';

/* ─── Animaciones base ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

/* ─── Palabras del título con stagger ─── */
const titleLines = [
  { words: ['De', 'la', 'teoría'] },
  { words: ['al', 'código', 'que'] },
  { words: ['se', 'despliega'] },
];

const wordVariants = {
  hidden: { opacity: 0, y: 32, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.07,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

/* ─── Badges flotantes ─── */
const badges = [
  { label: 'React', emoji: '⚛️', class: 'hero-badge--react' },
  { label: 'Python', emoji: '🐍', class: 'hero-badge--python' },
  { label: 'Node.js', emoji: '🟢', class: 'hero-badge--node' },
  { label: 'TypeScript', emoji: '🔷', class: 'hero-badge--ts' },
  { label: 'Go', emoji: '🐹', class: 'hero-badge--go' },
  { label: 'Docker', emoji: '🐳', class: 'hero-badge--docker' },
];

/* ─── Avatares de prueba social ─── */
const avatarColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

export function HeroSection() {
  let wordIndex = 0;

  return (
    <section className="hero" aria-label="Inicio">
      {/* Fondo: dot grid */}
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__grid">

          {/* ─── Columna izquierda ─── */}
          <div className="hero__left">

            {/* Eyebrow */}
            <motion.div className="hero__eyebrow" {...fadeUp(0.05)}>
              <span className="hero__eyebrow-dot" />
              Cursos creados por ingenieros de Stripe y Vercel
            </motion.div>

            {/* Título palabra a palabra */}
            <h1 className="hero__title" style={{ perspective: '600px' }}>
              {titleLines.map((line, li) => (
                <span key={li} className="hero__title-line">
                  {line.words.map((word) => {
                    const idx = wordIndex++;
                    const isAccent = word === 'despliega';
                    return (
                      <span key={word + idx} className="hero__word-wrap">
                        <motion.span
                          className={`hero__word${isAccent ? ' hero__word--accent' : ''}`}
                          custom={idx}
                          variants={wordVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {word}
                          {isAccent && (
                            <motion.span
                              className="hero__underline"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
                            />
                          )}
                        </motion.span>
                        {' '}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            {/* Subtítulo */}
            <motion.p className="hero__subtitle" {...fadeUp(0.55)}>
              Cursos prácticos de React, Node, Python, Go y mucho más —
              diseñados para que pases de ver tutoriales a construir
              productos reales.
            </motion.p>

            {/* CTAs */}
            <motion.div className="hero__actions" {...fadeUp(0.65)}>
              <Link to="/courses">
                <Button variant="primary" size="lg">
                  Explorar cursos
                  <ArrowRight size={17} />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="secondary" size="lg">
                  <Play size={15} style={{ fill: 'currentColor' }} />
                  Ver demo gratis
                </Button>
              </Link>
            </motion.div>

            {/* Prueba social */}
            <motion.div className="hero__social" {...fadeUp(0.75)}>
              <div className="hero__avatars">
                {avatarColors.map((c, i) => (
                  <span key={i} className="hero__avatar" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="hero__social-text">
                <strong>+60.000</strong> desarrolladores ya aprenden con nosotros
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div className="hero__stats" {...fadeUp(0.85)}>
              {[
                { value: '13', label: 'Instructores expertos' },
                { value: '4.8★', label: 'Valoración media' },
                { value: '100%', label: 'Proyectos reales' },
              ].map((s, i) => (
                <div key={s.label} className="hero__stat">
                  {i > 0 && <div className="hero__stat-sep" />}
                  <div className="hero__stat-inner">
                    <span className="hero__stat-value">{s.value}</span>
                    <span className="hero__stat-label">{s.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Columna derecha: panel animado ─── */}
          <div className="hero__right" aria-hidden="true">

            {/* Glow de fondo */}
            <motion.div
              className="hero__glow"
              {...fadeIn(0.4)}
            />

            {/* Tarjeta principal */}
            <motion.div
              className="hero-card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Cabecera de la tarjeta */}
              <div className="hero-card__header">
                <div className="hero-card__dots">
                  <span /><span /><span />
                </div>
                <span className="hero-card__pill">⚛️ React</span>
              </div>

              {/* Thumbnail */}
              <div className="hero-card__thumb">
                <div className="hero-card__play">
                  <Play size={20} fill="white" color="white" />
                </div>
                <div className="hero-card__progress-bar">
                  <motion.div
                    className="hero-card__progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: '68%' }}
                    transition={{ duration: 1.1, delay: 0.9, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="hero-card__body">
                <p className="hero-card__label">Lección 8 de 12</p>
                <p className="hero-card__title">Hooks avanzados y estado global</p>

                <div className="hero-card__meta">
                  <div className="hero-card__instructor">
                    <span className="hero-card__avatar">SM</span>
                    Sara Montoya
                  </div>
                  <div className="hero-card__rating">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>4.9</span>
                  </div>
                </div>

                <div className="hero-card__row">
                  <span className="hero-card__chip"><Clock size={11} /> 22h</span>
                  <span className="hero-card__chip"><BookOpen size={11} /> 87 lecciones</span>
                  <span className="hero-card__chip"><Users size={11} /> 14k</span>
                </div>
              </div>
            </motion.div>

            {/* Badges flotantes */}
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                className={`hero-badge ${badge.class}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: 'backOut' }}
              >
                <motion.div
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  className="hero-badge__inner"
                >
                  <span className="hero-badge__emoji">{badge.emoji}</span>
                  <span className="hero-badge__label">{badge.label}</span>
                </motion.div>
              </motion.div>
            ))}

            {/* Mini tarjeta de logro */}
            <motion.div
              className="hero-achievement"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <span className="hero-achievement__icon">🏆</span>
              <div>
                <p className="hero-achievement__title">Certificado obtenido</p>
                <p className="hero-achievement__sub">React Developer · Nivel avanzado</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
