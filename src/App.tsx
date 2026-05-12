import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CoursePlayerPage } from './pages/CoursePlayerPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CatalogPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/courses/:slug/play" element={<CoursePlayerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}
