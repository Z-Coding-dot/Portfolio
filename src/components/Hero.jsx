import heroImage from '../assets/photo.jpg';
import { HERO_CONTENT } from '../constants/index.js';
import { motion, useReducedMotion } from 'motion/react';
import { FiArrowDown, FiArrowUpRight, FiCode, FiDownload, FiPlus } from 'react-icons/fi';
import { getScrollReveal } from '../utils/scrollReveal';
import './Hero.css';

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-heading" dir="ltr">
      <motion.div className="hero-layout" {...getScrollReveal(reduceMotion)}>
        <div className="hero-copy">
          <p className="hero-eyebrow">Ziaulhaq Parsa Karimi</p>
          <p className="hero-role"><FiCode aria-hidden="true" /> Frontend Developer</p>
          <h1 id="hero-heading" className="hero-title">
            Web experiences,<br /><span>built with purpose.</span>
          </h1>
          <p className="hero-description">
            A Computer Science graduate from Astana IT University. I build responsive,
            thoughtful web experiences with React, TypeScript, and Tailwind CSS.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="hero-button hero-button--primary">
              Explore projects <FiArrowUpRight aria-hidden="true" />
            </a>
            <a href="/Parsa_CV.pdf" download className="hero-button hero-button--secondary">
              Download resume <FiDownload aria-hidden="true" />
            </a>
          </div>

          <a href="#technologies" className="hero-scroll-link">
            Explore my toolkit <span aria-hidden="true"><FiArrowDown /></span>
          </a>

          <details className="hero-about">
            <summary>More about me <FiPlus aria-hidden="true" /></summary>
            <p>{HERO_CONTENT}</p>
          </details>
        </div>

        <figure className="hero-portrait">
          <img
            src={heroImage}
            alt="Ziaulhaq Parsa Karimi"
            width={850}
            height={1117}
            fetchPriority="high"
            className="hero-portrait__image"
          />
          <figcaption className="hero-portrait__caption">
            From ideas to interfaces.
          </figcaption>
        </figure>
      </motion.div>
    </section>
  );
};

export default Hero;
