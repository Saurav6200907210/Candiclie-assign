import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap } from 'react-icons/hi';

/**
 * Footer - Site-wide footer with links and branding
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center">
                <HiOutlineAcademicCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">SchoolMS</h3>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              A modern, full-featured school management platform built with MERN stack. 
              Manage students, track attendance, and view analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-primary-400 transition-colors">Home</Link>
              <Link to="/dashboard" className="text-sm hover:text-primary-400 transition-colors">Dashboard</Link>
              <Link to="/students" className="text-sm hover:text-primary-400 transition-colors">Students</Link>
              <Link to="/students/add" className="text-sm hover:text-primary-400 transition-colors">Add Student</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300 border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex justify-center sm:justify-start">
          <p className="text-xs">&copy; {new Date().getFullYear()} SchoolMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
