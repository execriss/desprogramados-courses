import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import '../../styles/components/footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/logo.png" alt="Desprogramados" style={{ height: '48px', width: 'auto' }} />
            </div>
            <p className="footer__tagline">
              Cursos online premium impartidos por expertos de la industria. Mejora tus habilidades y construye lo que importa.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Plataforma</p>
            <ul className="footer__links">
              <li><Link to="/courses" className="footer__link">Todos los cursos</Link></li>
              <li><a href="#" className="footer__link">Rutas de aprendizaje</a></li>
              <li><a href="#" className="footer__link">Precios</a></li>
              <li><a href="#" className="footer__link">Para empresas</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Empresa</p>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Sobre nosotros</a></li>
              <li><a href="#" className="footer__link">Blog</a></li>
              <li><a href="#" className="footer__link">Trabaja con nosotros</a></li>
              <li><a href="#" className="footer__link">Contacto</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Legal</p>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Política de privacidad</a></li>
              <li><a href="#" className="footer__link">Términos de uso</a></li>
              <li><a href="#" className="footer__link">Política de cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Desprogramados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
