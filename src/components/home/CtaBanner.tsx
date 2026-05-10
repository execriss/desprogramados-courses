import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import '../../styles/components/sections.css';

export function CtaBanner() {
  return (
    <motion.section
      className="cta-banner"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="cta-banner__inner">
        <div>
          <h2 className="cta-banner__title">
            Empieza tu primer curso hoy — previsualizaciones gratis en cada ruta
          </h2>
          <p className="cta-banner__subtitle">
            Sin tarjeta de crédito. Cancela cuando quieras.
          </p>
        </div>
        <div className="cta-banner__action">
          <Link to="/register">
            <Button variant="primary" size="lg">
              Empieza gratis
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
