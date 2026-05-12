import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { Button } from '../components/ui/Button';
import '../styles/components/not-found.css';

export function NotFoundPage() {
  return (
    <PageWrapper>
      <MetaTags title="Página no encontrada" />
      <main className="not-found">
        <motion.div
          className="not-found__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p
            className="not-found__code"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            404
          </motion.p>
          <h1 className="not-found__title">Página no encontrada</h1>
          <p className="not-found__text">
            La página que buscas no existe o ha sido movida.
            Puede que la URL esté mal escrita o el contenido ya no esté disponible.
          </p>
          <div className="not-found__actions">
            <Link to="/">
              <Button variant="primary" size="md">
                <Home size={15} />
                Ir al inicio
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="ghost" size="md">
                <BookOpen size={15} />
                Ver cursos
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </PageWrapper>
  );
}
