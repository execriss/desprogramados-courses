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
    <section className="hero" aria-label="Hero">
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
            Trusted by 60,000+ developers worldwide
          </motion.div>

          <motion.h1
            className="hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Master modern web development — at your pace
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            Hands-on courses in React, Node, Python, Go, and more — crafted by engineers who ship real products.
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
                Browse courses
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="secondary" size="lg">View free previews</Button>
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
              <span className="hero__stat-label">Students enrolled</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">13</span>
              <span className="hero__stat-label">Expert instructors</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">4.8</span>
              <span className="hero__stat-label">Average rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
