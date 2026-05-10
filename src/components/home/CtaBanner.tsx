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
            Start your first course today — free previews on every track
          </h2>
          <p className="cta-banner__subtitle">
            No credit card required. Cancel anytime.
          </p>
        </div>
        <div className="cta-banner__action">
          <Link to="/register">
            <Button variant="primary" size="lg">
              Get started free
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
