import { EXPERIENCES } from '../constants';
import { motion, useReducedMotion } from 'motion/react';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { getScrollReveal } from '../utils/scrollReveal';
import './Experience.css';

const Experience = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-heading">
      <motion.header
        className="experience-header"
        {...getScrollReveal(reduceMotion)}
      >
        <p className="experience-header__eyebrow">Professional journey</p>
        <h2 id="experience-heading" className="experience-header__title">Experience</h2>
        <p className="experience-header__description">
          My journey through research and frontend development.
        </p>
        <span className="experience-header__divider" aria-hidden="true" />
      </motion.header>

      <ol className="experience-timeline">
        {EXPERIENCES.map((experience, index) => (
          <motion.li
            key={`${experience.company}-${experience.role}-${experience.year}`}
            className="experience-item"
            {...getScrollReveal(reduceMotion)}
          >
            <div className="experience-item__meta">
              <p className="experience-item__date">
                <FiCalendar aria-hidden="true" />
                {experience.year}
              </p>
              {index === 0 && (
                <span className="experience-item__latest">Most recent</span>
              )}
            </div>

            <article className="experience-card">
              <header className="experience-card__header">
                <span className="experience-card__icon" aria-hidden="true">
                  <FiBriefcase />
                </span>
                <div className="experience-card__identity">
                  <p className="experience-card__company">{experience.company}</p>
                  <h3 className="experience-card__role">{experience.role}</h3>
                </div>
              </header>

              <p className="experience-card__description">{experience.description}</p>

              <div className="experience-card__stack">
                <p className="experience-card__stack-label">Tools &amp; technologies</p>
                <ul className="experience-card__technologies" aria-label="Tools and technologies">
                  {experience.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </article>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
