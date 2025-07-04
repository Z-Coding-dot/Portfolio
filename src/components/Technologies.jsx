import React from 'react'
import { FaBootstrap, FaHtml5, FaJs, FaMdb, FaNodeJs, FaReact,  } from 'react-icons/fa'
import {motion} from 'framer-motion';
import { RiTailwindCssFill } from "react-icons/ri";
import { SiRedux } from "react-icons/si";
import { SiReactrouter } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";



const Technologies = () => {
  return (
    <motion.div
      initial={{opacity: 0, y: 200}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 1, ease: 'easeInOut'}}
      className='pb-24'>
      <h2 className="text-4xl text-center my-20">Technologies</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.div 
          initial={{opacity: 5, y: 10}}
          animate={{opacity: 5, y: -10}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><FaReact  className='text-7xl text-cyan-500'/></motion.div>
        <motion.div 
          initial={{opacity: 5, y: 20}}
          animate={{opacity: 5, y: -20}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><FaBootstrap  className='text-7xl text-blue-500'/></motion.div>
        <motion.div 
         initial={{opacity: 5, y: -20}}
         animate={{opacity: 5, y: 20}}
         transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><FaJs className='text-7xl text-yellow-300'/></motion.div>
        <motion.div 
          initial={{opacity: 5, y: 10}}
          animate={{opacity: 5, y: 10}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><RiTailwindCssFill className='text-7xl text-cyan-500'/></motion.div>
        <motion.div 
          initial={{opacity: 5, y: 10}}
          animate={{opacity: 5, y: -10}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><SiRedux  className='text-7xl text-purple-600'/></motion.div>
        <motion.div 
          initial={{opacity: 5, y: -10}}
          animate={{opacity: 5, y: 10}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><FaHtml5  className='text-7xl text-orange-600'/></motion.div>
        <motion.div 
          initial={{opacity: 5, y: 10}}
          animate={{opacity: 5, y: -10}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><SiReactrouter  className='text-7xl text-cyan-500'/></motion.div>
        <motion.div 
          initial={{opacity: 5, y: -10}}
          animate={{opacity: 5, y: 10}}
          transition={{duration: 1.5, ease: 'linear', repeat:Infinity, repeatType:'reverse'}}
         className="p-4"><TbBrandFramerMotion  className='text-7xl text-pink-600'/></motion.div>
      </div>
    </motion.div>
  )
}

export default Technologies
