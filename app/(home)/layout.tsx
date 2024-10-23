'use client';

import { ReactNode } from 'react';
import Footer from './_components/footer';
import { Element, Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { Navbar } from './_components/ui/navbar';

interface CommonLayoutProps {
  children: ReactNode;
  about: ReactNode;
  education: ReactNode;
  experience: ReactNode;
  skills: ReactNode;
  projects: ReactNode;
  blogs: ReactNode;
  contact: ReactNode;
}

const sectionAnimation = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function CommonLayout({
  children,
  about,
  education,
  experience,
  skills,
  projects,
  blogs,
  contact,
}: CommonLayoutProps) {
  return (
    <div className="space-y-5 pt-4 px-2">
      <Navbar />

      {/* Main content */}
      <section>{children}</section>

      {/* Skills section with animation */}
      <Element name="skills">
        <motion.section
          className="h-screen"
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {skills}
        </motion.section>
      </Element>

      {/* About section with animation */}
      <Element name="about">
        <motion.section
          className="h-screen"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {about}
        </motion.section>
      </Element>

      {/* Education section with animation */}
      <Element name="education">
        <motion.section
          className="h-screen"
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {education}
        </motion.section>
      </Element>

      {/* Experience section with animation */}
      <Element name="experience">
        <motion.section
          className="h-screen"
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {experience}
        </motion.section>
      </Element>

      {/* Projects section with animation */}
      <Element name="projects">
        <motion.section
          className="h-screen"
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {projects}
        </motion.section>
      </Element>

      {/* Blogs section with animation */}
      <Element name="blogs">
        <motion.section
          className="h-screen"
          id="blogs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {blogs}
        </motion.section>
      </Element>

      {/* Contact section with animation */}
      <Element name="contact">
        <motion.section
          className="h-screen"
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionAnimation}
        >
          {contact}
        </motion.section>
      </Element>
      <Footer />
    </div>
  );
}
