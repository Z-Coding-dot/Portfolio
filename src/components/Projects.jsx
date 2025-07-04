import { PROJECTS } from '../constants/index.js';
import { motion } from 'framer-motion';
const Projects = () => {
  return (
    <div className='p-4'>
      <motion.h2
         initial={{opacity: 0, y: 200}}
         animate={{opacity: 1, y: 0}}
         transition={{duration: 1, ease: 'easeInOut'}}
       className="my-20 text-2xl sm:text-3xl md:text-4xl text-center font-bold">Projects</motion.h2>
       {PROJECTS.map((project, index) => (
            <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
                <div className="w-full lg:w-1/3">
                <a href={project.link} target='_blank' rel="noopener noreferrer">
                <motion.img
                whileInView={{opacity: 1, y: 0}}
                whileHover={{scale: 1.1}}
                initial={{opacity: 0, y: 200}}
                transition={{duration: 1, ease: 'easeInOut'}}
                src={project.image} alt={project.title}
                width={250}
                height={250}
                className="max-lg:w-full max-lg:h-auto rounded max-lg:rounded-xl mb-7" /></a>
                </div>
                <motion.div
                 whileInView={{opacity: 1, y: 0}}
                 initial={{opacity: 0, y: 200}}
                 transition={{duration: 1, ease: 'easeInOut'}}
                 className="w-full max-w-xl lg:w-3/4">
                  <a href={project.link} target='_blank' rel='noopener noreferrer' >
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 hover:underline hover:text-blue-500">{project.title}</h2></a>
                    <p className=" text-stone-500 text-sm sm:text-base mb-4">{project.description}</p>

                    <div className='flex flex-wrap items-center justify-start'>
                    {project.technologies.map((tech, index) => (
                        <span key={index} 
                        className='px-4 py-2  bg-gray-900 rounded  mx-2 my-2 font-medium text-sm sm:text-base' >{tech}</span>
                    ))}
                    </div>
                </motion.div>
            </div>
       ))}
    </div>
  )
}

export default Projects
