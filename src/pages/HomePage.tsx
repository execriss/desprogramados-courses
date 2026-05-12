import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { HeroSection } from '../components/home/HeroSection';
import { LearningPaths } from '../components/home/LearningPaths';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { Testimonials } from '../components/home/Testimonials';
import { CourseGrid } from '../components/courses/CourseGrid';
import { mockCourses } from '../data/mockCourses';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import '../styles/components/sections.css';

const featuredCourses = mockCourses.filter((c) => c.isFeatured);

export function HomePage() {
  return (
    <PageWrapper>
      <MetaTags
        title="Aprende como se hace en producción"
        description="Cursos de React, Node, Python, Go y más — enseñados como se usan en Stripe, Vercel y Shopify. No tutoriales: flujos de trabajo reales."
      />
      <main>
        <HeroSection />
        <LearningPaths />

        <section className="section section--alt">
          <div className="section__inner">
            <div className="section__header section__header--row">
              <div>
                <p className="section__eyebrow">Cursos destacados</p>
                <h2 className="section__title">Seleccionados para ti</h2>
              </div>
              <Link to="/courses">
                <Button variant="ghost" size="sm">
                  Ver todos <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
            <CourseGrid courses={featuredCourses} />
          </div>
        </section>

        <FeaturesSection />
        <Testimonials />
      </main>
    </PageWrapper>
  );
}
