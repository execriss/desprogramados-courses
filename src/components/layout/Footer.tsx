import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import '../../styles/components/footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">Learn<span>Craft</span></div>
            <p className="footer__tagline">
              Premium online courses taught by industry experts. Level up your skills and build what matters.
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
            <p className="footer__col-title">Platform</p>
            <ul className="footer__links">
              <li><Link to="/courses" className="footer__link">All Courses</Link></li>
              <li><a href="#" className="footer__link">Learning Paths</a></li>
              <li><a href="#" className="footer__link">Pricing</a></li>
              <li><a href="#" className="footer__link">For Teams</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Company</p>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">About</a></li>
              <li><a href="#" className="footer__link">Blog</a></li>
              <li><a href="#" className="footer__link">Careers</a></li>
              <li><a href="#" className="footer__link">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Legal</p>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Privacy Policy</a></li>
              <li><a href="#" className="footer__link">Terms of Service</a></li>
              <li><a href="#" className="footer__link">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} LearnCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
