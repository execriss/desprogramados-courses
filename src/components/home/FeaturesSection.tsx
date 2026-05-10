import { motion } from 'framer-motion';
import { Zap, BookOpen, Award } from 'lucide-react';
import '../../styles/components/sections.css';

const features = [
  {
    icon: <Zap size={22} />,
    title: 'Learn by building',
    text: 'Every course revolves around a real project. You ship code from lesson one — no toy examples, no filler.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Curated, not bloated',
    text: 'We remove redundancy ruthlessly. Each lesson earns its place. Finish courses in days, not months.',
  },
  {
    icon: <Award size={22} />,
    title: 'Industry instructors',
    text: 'Taught by engineers at Stripe, Vercel, and Shopify — people who use these tools in production daily.',
  },
];

export function FeaturesSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Why LearnCraft</p>
          <h2 className="section__title">Built for developers who ship</h2>
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
              <h3 className="feature-block__title">{f.title}</h3>
              <p className="feature-block__text">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
