import onlineStore from "../assets/projects/onlineStore.png";
import coffee from "../assets/projects/coffee.png";
import commerce from "../assets/projects/e-commerce.png";
import TMDB from "../assets/projects/TMDB.png";
import weather from "../assets/projects/weather.png";
import quiz from "../assets/projects/quiz.png";

export const HERO_CONTENT = `I'm a passionate and detail-oriented Computer Science student
 at Astana IT University, specializing in Frontend Web Development using modern technologies like React.js, Tailwind CSS, and JavaScript (ES6+).
I enjoy building responsive, user-friendly web interfaces and bringing creative UI ideas to life with tools like Framer Motion, clsx, and React Scroll. During my recent internship at iQadam Systems LLP, 
I worked on real-world e-commerce features, collaborating with a team to deliver clean,
 scalable React components.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "June 2025 - July 2025",
    role: "Frontend Developer Intern",
    company: "iQadam Systems LLP",
    description: `Developed and maintained responsive e-commerce components using React.js and Redux.
    Collaborated with the frontend team using Git and Figma for agile workflows.
    Contributed to UI design enhancements and improved component reusability.`,
    technologies: [
      "Javascript",
      "React.js",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Git",
      "Figma",
      "clsx",
      "React Scroll",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Online Shopping Platform",
    image: onlineStore,
    description: `A multi-page store layout using React.js and Tailwind CSS with smooth navigation and reusable
       components. It includes a responsive UI, product detail pages, and a mock checkout flow.`,
    technologies: [
      "Tailwind CSS",
      "React",
      "Redux",
      "React Router",
      "clsx",
      "React Scroll",
    ],
    link: "https://online-store-navy-nine.vercel.app/",
  },
  {
    title: "Coffee Shop Website",
    image: coffee,
    description: `A modern and visually appealing website for a fictional coffee shop. Designed using React and Bootstrap with smooth scroll navigation, image galleries, and animated menus.
       The UI is responsive and optimized for mobile devices.`,
    technologies: [
      "Tailwind CSS",
      "React",
      "Redux",
      "React Router",
      "Framer Motion",
      "clsx",
      "React Scroll",
    ],
    link: "https://coffee-store-one-phi.vercel.app/",
  },
  {
    title: "E-Commerce React App",
    image: commerce,
    description: `A fully responsive online store built using React.js and Tailwind CSS. Features include product 
      listing, filtering by category, detailed product view, and cart functionality.
       Routing is handled with React Router, and product data is dynamically fetched from a mock API.`,
    technologies: ["HTML5", "Tailwind CSS", "React", "Redux", "React Router"],
    link: "https://e-commerce-one-beta-90.vercel.app/",
  },
  {
    title: "TMDB Movie App",
    image: TMDB,
    description: `A React-based movie search app powered by the TMDB (The Movie Database) API. Users can browse popular films, search by title, view movie details, and navigate between pages using dynamic routing.
     Includes loading states and error handling for better UX.`,
    technologies: [
      "React",
      "TMDB API",
      "Axios",
      "React Router",
      "Tailwind CSS",
    ],
    link: "https://github.com/Z-Coding-dot/TMDB-Movie",
  },
  {
    title: "Weather App",
    image: weather,
    description: `Real-time weather forecast app that allows users to search any city and see current weather conditions. 
      Built using React and OpenWeatherMap API, with React Hooks for state and lifecycle management. Includes mobile-responsive design and dynamic background changes based on weather.`,
    technologies: ["HTML5", "Tailwind CSS", "React ", "React Router"],
    link: "https://z-coding-dot.github.io/Weather-App/",
  },
  {
    title: "Quiz App",
    image: quiz,
    description: `An interactive quiz app with multiple-choice questions and score tracking. Built using React with state management to handle question flow, user input, and final results. 
    Includes progress bar, animations, and responsive design.`,
    technologies: ["React", "Tailwind CSS", "HTML5"],
  },
];

export const CONTACT = {
  address: "Kabanbay Batyr 60A/13 Astana, Kazakhstan",
  phoneNo: "+7 705 773 0995",
  email: "parsakarimi776@gmail.com",
};
