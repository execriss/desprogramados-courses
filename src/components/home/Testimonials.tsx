import { motion } from 'framer-motion';
import { testimonials } from '../../data/mockCourses';
import '../../styles/components/sections.css';

export function Testimonials() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Testimonios</p>
          <h2 className="section__title">Lo que dicen nuestros estudiantes</h2>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="testimonial-card__quote">"{t.text}"</p>
              <div className="testimonial-card__footer">
                <p className="testimonial-card__name">{t.name}</p>
                <p className="testimonial-card__role">{t.role}</p>
                <p className="testimonial-card__course">{t.course}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
