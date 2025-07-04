import React from 'react'
import logo from '../assets/logo.png'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-14 bg-transparent backdrop-blur-2xl flex items-center justify-between py-4">
      <div className="flex items-center justify-between w-full">
        <a href="/" aria-label="Home">
          <img src={logo} className="mx-4 w-50" />
        </a>
        <div className="flex items-center justify-center m-8 gap-4 text-2xl">
          <a
            href="https://www.linkedin.com/in/ziaulhaq-parsa-karimi-8a6149373?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9y6oVBtLQKC6xSkF1BvR4g%3D%3D"
            aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Z-Coding-dot" aria-label="GitHub">
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/princeparsa53?igsh=eW4zZ2d6b3l3bjZq"
            aria-label="Instagram">
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/ziualhaqparsa.ziyalhaq?mibextid=ZbWKwL"
            aria-label="facebook"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
