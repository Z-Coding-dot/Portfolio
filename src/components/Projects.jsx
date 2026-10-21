import { useId, useState } from 'react';
import { PROJECTS } from '../constants/index.js';
import { motion, useReducedMotion } from 'motion/react';
import { FiArrowUpRight, FiChevronDown, FiInfo, FiX } from 'react-icons/fi';
import { getScrollReveal } from '../utils/scrollReveal';
import './Projects.css';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const detailsId = useId();
  const reduceMotion = useReducedMotion();
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 6);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-heading">
      <motion.header
        className="projects-header"
        {...getScrollReveal(reduceMotion)}
      >
        <p className="projects-header__eyebrow">Selected work</p>
        <div className="projects-header__title-row">
          <h2 id="projects-heading" className="projects-header__title">Projects</h2>
          <span className="projects-header__badge" aria-hidden="true">
            {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>
        <p className="projects-header__description">
          A selection of websites and applications I’ve built.
        </p>
        <span className="projects-header__divider" aria-hidden="true" />
      </motion.header>

      <svg width="0" height="0" aria-hidden="true" className="project-card-shapes">
        <defs>
          <clipPath id="project-card-shape" clipPathUnits="objectBoundingBox">
            <path d="M .08 0 H .92 Q 1 0 1 .08 V .72 Q 1 .80 .92 .80 H .85 Q .75 .80 .75 .90 Q .75 1 .67 1 H .08 Q 0 1 0 .92 V .08 Q 0 0 .08 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div id="projects-grid" className="projects-grid">
        {visibleProjects.map((project, index) => {
          const detailsOpen = expandedProject === project.title;
          const projectDetailsId = `${detailsId}-details-${index}`;

          return (
            <motion.article
              key={project.title}
              {...getScrollReveal(reduceMotion, (index % 3) * 0.08)}
              className="project-card"
            >
              <div
                className="project-card__target"
                role="group"
                aria-label={project.title}
                tabIndex={project.link ? undefined : 0}
                data-expanded={detailsOpen}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && detailsOpen) {
                    setExpandedProject(null);
                    event.currentTarget.querySelector('.project-card__details-toggle')?.focus();
                  }
                }}
              >
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                    aria-label={`Visit ${project.title} (opens in a new tab)`}
                  >
                    <span className="project-card__arrow" aria-hidden="true">
                      <FiArrowUpRight />
                    </span>
                  </a>
                )}
                <div className="project-card__surface">
                  <img
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="project-card__image"
                  />
                  <div className="project-card__shade" aria-hidden="true" />

                  <div className="project-card__content">
                    <h3 className="project-card__title">{project.title}</h3>

                    <div
                      id={projectDetailsId}
                      className="project-card__details"
                      tabIndex={0}
                      role="region"
                      aria-label={`${project.title} details`}
                    >
                      <p className="project-card__description">{project.description}</p>
                      <ul className="project-card__technologies" aria-label="Technologies used">
                        {project.technologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="project-card__details-toggle"
                  aria-expanded={detailsOpen}
                  aria-controls={projectDetailsId}
                  aria-label={`${detailsOpen ? 'Hide' : 'Show'} details for ${project.title}`}
                  onClick={() => setExpandedProject((previous) => (
                    previous === project.title ? null : project.title
                  ))}
                >
                  {detailsOpen ? <FiX aria-hidden="true" /> : <FiInfo aria-hidden="true" />}
                  {detailsOpen ? 'Close' : 'Details'}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
      {PROJECTS.length > 5 && (
        <div className="projects-footer">
          <p className="projects-footer__count" role="status">
            <span>{String(visibleProjects.length).padStart(2, '0')}</span>
            <span aria-hidden="true"> / </span>
            {String(PROJECTS.length).padStart(2, '0')} projects
          </p>
          <button
            type="button"
            onClick={() => {
              setShowAll((previous) => !previous);
              setExpandedProject(null);
            }}
            aria-expanded={showAll}
            aria-controls="projects-grid"
            className="projects-toggle"
          >
            <span className="projects-toggle__label">
              {showAll ? 'Show less' : 'Explore more projects'}
            </span>
            {!showAll && (
              <span className="projects-toggle__badge" aria-hidden="true">
                +{PROJECTS.length - visibleProjects.length}
              </span>
            )}
            <span className="projects-toggle__icon" aria-hidden="true">
              <FiChevronDown />
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
