import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'technologies', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const navigationId = useId();
  const menuId = `${navigationId}-mobile-navigation`;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const activationLine = Math.max(96, window.innerHeight * 0.25);
      let current = 'home';
      for (const { id } of NAV_LINKS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = 'contact';
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnOutsidePress = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    const desktop = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <nav className="navbar" aria-label="Main navigation">
        <a href="#home" className="navbar__brand" aria-label="Ziaulhaq Parsa home" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="" />
        </a>

        <ul className="navbar__links">
          {NAV_LINKS.slice(0, -1).map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="navbar__link" aria-current={activeSection === id ? 'location' : undefined}>
                {activeSection === id && (
                  <motion.span
                    className="navbar__active-pill"
                    layoutId={reduceMotion ? undefined : `${navigationId}-active-pill`}
                    initial={false}
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.35 }}
                    aria-hidden="true"
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a href="#contact" className="navbar__contact" aria-current={activeSection === 'contact' ? 'location' : undefined} onClick={() => setMenuOpen(false)}>
            Let's talk <FiArrowUpRight aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="navbar__menu-toggle"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <nav id={menuId} className="navbar-mobile" aria-label="Mobile navigation" hidden={!menuOpen}>
        <ul>
          {NAV_LINKS.map(({ id, label }, index) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
                onClick={() => {
                  setMenuOpen(false);
                  toggleRef.current?.focus({ preventScroll: true });
                }}
              >
                <span className="navbar-mobile__number" aria-hidden="true">0{index + 1}</span>
                {label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
