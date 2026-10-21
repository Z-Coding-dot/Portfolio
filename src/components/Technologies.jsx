import { FaBootstrap, FaHtml5, FaJs, FaReact } from 'react-icons/fa';
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { RiTailwindCssFill } from 'react-icons/ri';
import {
  SiCss3, SiGit, SiReacthookform, SiReactquery,
  SiReactrouter, SiRedux, SiSass, SiShadcnui, SiTypescript, SiVite, SiZod,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { getScrollReveal } from '../utils/scrollReveal';
import './Technologies.css';

const TECHNOLOGIES = [
  { name: 'React', detail: 'UI development', icon: FaReact, color: '#61dafb' },
  { name: 'TypeScript', detail: 'Typed JavaScript', icon: SiTypescript, color: '#60a5fa' },
  { name: 'Tailwind CSS', detail: 'Utility-first styling', icon: RiTailwindCssFill, color: '#22d3ee' },
  { name: 'JavaScript', detail: 'Web interactivity', icon: FaJs, color: '#facc15' },
  { name: 'Redux', detail: 'State management', icon: SiRedux, color: '#a78bfa' },
  { name: 'React Router', detail: 'Client-side routing', icon: SiReactrouter, color: '#f87171' },
  { name: 'Framer Motion', detail: 'Interface animation', icon: TbBrandFramerMotion, color: '#e879f9' },
  { name: 'HTML5', detail: 'Semantic structure', icon: FaHtml5, color: '#fb923c' },
  { name: 'Sass', detail: 'Organized styles', icon: SiSass, color: '#f472b6' },
  { name: 'Bootstrap', detail: 'Responsive layouts', icon: FaBootstrap, color: '#c084fc' },
  { name: 'shadcn/ui', detail: 'UI components', icon: SiShadcnui, color: '#e7e5e4' },
  { name: 'TanStack Query', detail: 'Server-state queries', icon: SiReactquery, color: '#fb7185' },
  { name: 'React Hook Form', detail: 'Form management', icon: SiReacthookform, color: '#f472b6' },
  { name: 'Zod', detail: 'Schema validation', icon: SiZod, color: '#60a5fa' },
  { name: 'Vite', detail: 'Development tooling', icon: SiVite, color: '#a78bfa' },
  { name: 'Git', detail: 'Version control', icon: SiGit, color: '#fb923c' },
  { name: 'CSS3', detail: 'Styling and layout', icon: SiCss3, color: '#38bdf8' },
];

const TechnologyCard = ({ technology, index }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const animateIcon = inView && !reduceMotion;
  const { name, detail, icon: Icon, color } = technology;

  return (
    <motion.li
      ref={cardRef}
      className="technology-card"
      style={{ '--technology-color': color }}
      {...getScrollReveal(reduceMotion, (index % 5) * 0.04)}
    >
      <motion.span
        className="technology-card__icon"
        aria-hidden="true"
        animate={animateIcon ? { y: [0, -6, 0], rotate: [0, 3, 0, -3, 0] } : { y: 0, rotate: 0 }}
        transition={animateIcon
          ? { duration: 3.2 + (index % 3) * 0.3, delay: (index % 5) * 0.12, repeat: Infinity, ease: 'easeInOut' }
          : { duration: reduceMotion ? 0 : 0.2 }}
      >
        <Icon />
      </motion.span>
      <h3 className="technology-card__name">{name}</h3>
      <p className="technology-card__detail">{detail}</p>
    </motion.li>
  );
};

const Technologies = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="technologies" className="technologies-section" aria-labelledby="technologies-heading">
      <motion.header className="technologies-header" {...getScrollReveal(reduceMotion)}>
        <p className="technologies-header__eyebrow">My toolkit</p>
        <h2 id="technologies-heading" className="technologies-header__title">Technologies</h2>
        <p className="technologies-header__description">
          The tools I use to turn designs into working web experiences.
        </p>
        <span className="technologies-header__divider" aria-hidden="true" />
      </motion.header>

      <ul className="technologies-grid" aria-label="Development tools and technologies">
        {TECHNOLOGIES.map((technology, index) => (
          <TechnologyCard key={technology.name} technology={technology} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default Technologies;
