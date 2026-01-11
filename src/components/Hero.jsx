// import heroImage from '../assets/hero.jpg';
import heroImage from '../assets/photo.jpg';

import { HERO_CONTENT } from '../constants/index.js';
import { motion } from 'motion/react';
const Hero = () => {
  return (
    <div className="max-lg:px-4 px-30 py-20 max-lg:py-20">
      <div className="flex flex-wrap lg:flex-row-reverse items-center">
        <div className="w-full lg:w-1/2">
          <motion.img 
           initial={{opacity: 0, y: 200}}
           animate={{opacity: 1, y: 0}}
           transition={{duration: 1, ease: 'easeInOut'}}
           src={heroImage} alt="Ziaulhaq Parsa Karimi"
           className="rounded-3xl border border-stone-900 transition-all duration-500 ease-in-out hover:ring-2 sm:h-160 w-full object-center object-cover
            hover:ring-blue-300 hover:border-stone-300 active:ring-4 active:ring-stone-500 active:border-stone-500 cursor-pointer" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:items-start mb-10">
        <motion.h1
         initial={{opacity: 0, x: 200}}
          animate={{opacity: 1, x: 0}}
          transition={{duration:1.6, ease: 'easeInOut'}}
         className="text-center lg:text-start text-3xl sm:text-4xl md:text-5xl font-bold my-4 tracking-tighter">Ziaulhaq Parsa Karimi</motion.h1>
          <motion.span
            initial={{opacity: 0, x:-300}}
            animate={{opacity: 1, x:0}}
            transition={{duration:1.9, ease: 'easeInOut'}}
           className="text-xl sm:text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-stone-300 to-stone-600 font-bold">Frontend Developer</motion.span>
          <motion.p
            initial={{opacity: 0, x: -400}}
            animate={{opacity: 1, x: 0}}
            transition={{duration:2.9, ease: 'easeInOut'}}
           className="text-base sm:text-lg max-w-lg text-stone-400 my-2 py-5 leading-relaxed">{HERO_CONTENT}</motion.p>
          <motion.a
          initial={{opacity: 0, y: 200}}
          animate={{opacity: 1, y: 0}}
          transition={{duration:2.5, ease: 'easeInOut'}}
           href="/resume.pdf" download 
          className='bg-gradient-to-r from-stone-300 to-stone-600
           text-stone-900 hover:bg-gradient-to-l hover:from-stone-600 hover:to-stone-300
             font-bold py-2 
           px-4 rounded-full transition duration-500 ease-in-out'>
           Download Resume</motion.a>
        </div>
      </div>
    </div>
  );
} 

export default Hero
