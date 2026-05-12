import { motion } from 'framer-motion';
import '../../styles/components/sections.css';

const testimonials = [
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
