'use client';

import { ReactNode } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';

import Footer from './_components/footer';
import { Navbar } from './_components/ui/navbar';

interface CommonLayoutProps {
  children: ReactNode;
  aboutMe: ReactNode;
  education: ReactNode;
  experience: ReactNode;
  skills: ReactNode;
  projects: ReactNode;
  myBlogs: ReactNode;
  contactMe: ReactNode;
}

const sectionAnimation = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function CommonLayout({
  children,
  aboutMe,
  education,
  experience,
  skills,
  projects,
  myBlogs,
  contactMe,
}: CommonLayoutProps) {
  return (
    <div className="space-y-5 pt-4 px-2">
      <Navbar />

      {/* Main content */}
      <Element name="home">
        <motion.section
          className="h-full my-5"
          id="home"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {' '}
          {children}
        </motion.section>
      </Element>

      {/* Skills section with animation */}
      <Element name="skills">
        <motion.section
          className="h-full my-5"
          id="skills"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {skills}
        </motion.section>
      </Element>

      {/* Experience section with animation */}
      <Element name="experience">
        <motion.section
          className="h-full my-5"
          id="experience"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {experience}
        </motion.section>
      </Element>

      {/* About section with animation */}
      <Element name="about">
        <motion.section
          className="h-full my-5"
          id="about"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {aboutMe}
        </motion.section>
      </Element>

      {/* Education section with animation */}
      <Element name="education">
        <motion.section
          className="h-full my-5"
          id="education"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {education}
        </motion.section>
      </Element>

      {/* Projects section with animation */}
      <Element name="projects">
        <motion.section
          className="h-full my-5"
          id="projects"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {projects}
        </motion.section>
      </Element>

      {/* Blogs section with animation */}
      <Element name="blogs">
        <motion.section
          className="h-full my-5"
          id="blogs"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {myBlogs}
        </motion.section>
      </Element>

      {/* Contact section with animation */}
      <Element name="contact">
        <motion.section
          className="h-full my-5"
          id="contact"
          initial="hidden"
          variants={sectionAnimation}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          {contactMe}
        </motion.section>
      </Element>
      <Footer />
    </div>
  );
}
