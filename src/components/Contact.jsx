import React from 'react'
import { CONTACT } from '../constants';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';
const Contact = () => {
  return (
    <div className='border-t border-t-stone-700 px-10 py-10'>
        <h2 className="text-center text-4xl text-stone-400 mb-20">Get in Touch</h2>
        <div className="grid lg:grid-cols-4 gap-4">
            <div className='flex flex-col items-center'>
                <img src={logo} alt="Company" className='my-15 w-100 h-auto' />
            </div>
            <div>
                <h3 className="text-base sm:text-xl font-bold">Contact</h3>
                <p className="text-stone-300 my-3 text-sm sm:text-base">{CONTACT.address}</p>
                <p className="text-stone-300 my-3 text-sm sm:text-base">{CONTACT.phoneNo}</p>
                <p className="text-stone-300 my-3 text-sm sm:text-base">{CONTACT.email}</p>
            </div>
            <div className=''>
                <h3 className="text-base sm:text-xl text-start font-bold">Social Media</h3>
                <div className="flex justify-start items-start gap-4 sm:gap-10 my-15">
                  <a target='_blank' rel='noopener noreferrer' href="https://www.linkedin.com/in/ziaulhaq-parsa-karimi-8a6149373?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9y6oVBtLQKC6xSkF1BvR4g%3D%3D"aria-label="LinkedIn">
                    <FaLinkedin className='size-7' /></a>
                    <a target='_blank' rel='noopener noreferrer' href="https://github.com/Z-Coding-dot" aria-label="GitHub">
                    <FaGithub className='size-7' /></a>
                    <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/princeparsa53?igsh=eW4zZ2d6b3l3bjZq"aria-label="Instagram">
                    <FaInstagram className='size-7' /></a>
                    <a target='_blank' rel='noopener noreferrer' href="https://www.facebook.com/ziualhaqparsa.ziyalhaq?mibextid=ZbWKwL"aria-label="facebook">
                    <FaFacebook className='size-7' /></a>
            
                </div>
            </div>
            <div className='mb-10'>
                <h3 className="text-base sm:text-xl font-bold">About</h3>
                <p className="mt-3 px-4 py-2 text-stone-600 text-sm sm:text-base">I'm a passionate and detail-oriented Computer Science student at Astana IT University, specializing in Frontend Web Development using modern technologies like React.js, Tailwind CSS, and JavaScript (ES6+).</p>
            </div>
        </div>
        <hr />
        <p className="text-sm text-center mt-5 text-stone-500">&copy; {new Date().getFullYear()} Ziaulhaq Parsa. All rights reserved.</p>

    </div>
  )
}

export default Contact
