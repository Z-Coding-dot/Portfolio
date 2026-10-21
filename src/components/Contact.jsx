import { CONTACT } from '../constants';
import { motion, useReducedMotion } from 'motion/react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiArrowUp, FiArrowUpRight, FiMail, FiMapPin, FiMessageSquare, FiPhone } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { getScrollReveal } from '../utils/scrollReveal';
import PwaInstall from './PwaInstall';
import './Contact.css';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/ziaulhaq-parsa-karimi-8a6149373' },
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/Z-Coding-dot' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/parsa_____official' },
  { label: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/ziualhaqparsa.ziyalhaq' },
];

const Contact = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <motion.header
        className="contact-header"
        {...getScrollReveal(reduceMotion)}
      >
        <p className="contact-header__eyebrow">Start a conversation</p>
        <h2 id="contact-heading" className="contact-header__title">Get in touch</h2>
        <p className="contact-header__description">Have a project in mind? Let's talk about it.</p>
        <span className="contact-header__divider" aria-hidden="true" />
      </motion.header>

      <motion.div
        className="contact-panel"
        {...getScrollReveal(reduceMotion)}
      >
        <div className="contact-intro">
          <span className="contact-intro__icon" aria-hidden="true"><FiMessageSquare /></span>
          <h3 className="contact-intro__title">Good things start with a conversation.</h3>
          <p className="contact-intro__description">
            Tell me what you're working on, share an idea, or just say hello.
          </p>
          <a className="contact-cta" href={`mailto:${CONTACT.email}`}>
            Let's talk
            <span className="contact-cta__icon" aria-hidden="true"><FiArrowUpRight /></span>
          </a>
        </div>

        <address className="contact-methods" aria-label="Contact details">
          <a className="contact-method" href={`mailto:${CONTACT.email}`}>
            <span className="contact-method__icon" aria-hidden="true"><FiMail /></span>
            <span className="contact-method__text">
              <span className="contact-method__label">Email</span>
              <span className="contact-method__value">{CONTACT.email}</span>
            </span>
            <FiArrowUpRight className="contact-method__arrow" aria-hidden="true" />
          </a>
          <a className="contact-method" href={`tel:${CONTACT.phoneNo.replace(/[^\d+]/g, '')}`}>
            <span className="contact-method__icon" aria-hidden="true"><FiPhone /></span>
            <span className="contact-method__text">
              <span className="contact-method__label">Phone</span>
              <span className="contact-method__value">{CONTACT.phoneNo}</span>
            </span>
            <FiArrowUpRight className="contact-method__arrow" aria-hidden="true" />
          </a>
          <div className="contact-method">
            <span className="contact-method__icon" aria-hidden="true"><FiMapPin /></span>
            <span className="contact-method__text">
              <span className="contact-method__label">Location</span>
              <span className="contact-method__value">{CONTACT.address}</span>
            </span>
          </div>
        </address>
      </motion.div>

      <motion.footer className="contact-footer" {...getScrollReveal(reduceMotion)}>
        <div className="contact-footer__main">
          <div className="contact-brand">
            <a href="/" className="contact-brand__home" aria-label="Ziaulhaq Parsa home">
              <img src={logo} alt="" className="contact-brand__logo" loading="lazy" />
            </a>
            <p>Frontend developer building web experiences with React, TypeScript, and Tailwind CSS.</p>
          </div>
          <div className="contact-socials">
            <p className="contact-socials__label">Find me online</p>
            <ul className="contact-socials__list" aria-label="Social profiles">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="contact-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Ziaulhaq Parsa. All rights reserved.</p>
          <div className="contact-footer__actions">
            <PwaInstall />
            <button
              type="button"
              className="contact-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })}
            >
              Back to top <FiArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;
