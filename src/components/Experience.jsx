import React from 'react'
import {EXPERIENCES} from '../constants';
import {motion} from 'motion/react';
const Experience = () => {
  return (
    <div className='p-4'>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center my-20 font-bold">Experience</h2>
        <div>
        {EXPERIENCES.map((exp, index) => (
            <div key={index} className="mb-18 flex flex-wrap lg:justify-center gap-8">
                <div className="w-full lg:w-1/4">
                    <motion.p 
                    initial={{opacity: 0, x: -200}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, ease: 'easeInOut'}}
                     className="mb-2 font-semibold text-sm sm:text-base xl:text-lg text-stone-400">{exp.year}</motion.p>
                </div>
                <motion.div
                 initial={{opacity: 0, x: 200}}
                 whileInView={{opacity: 1, x: 0}}
                 transition={{duration: 1, ease: 'easeInOut'}}
                 className="w-full max-w-xl lg:w-3/4">
                    <h3 className="mb-2 font-semibold text-xl sm:text-2xl text-stone-200">{exp.role} -
                        <span className='text-stone-400 text-base sm:text-lg'>  {exp.company}</span> </h3>
                    <p className="text-stone-400 mb-4 text-sm sm:text-base">{exp.description}</p>
                   
                    <div className='flex flex-wrap'>
                    {exp.technologies.map((te, index) =>(
                    <span key={index} className="text-sm sm:text-base font-medium bg-stone-800 text-stone-300 mr-2 mt-4 py-2 px-4 rounded ">{te}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        ))}
        </div>
      
    </div>
  )
}

export default Experience
