import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineChartBar, HiOutlinePlusCircle, HiArrowRight } from 'react-icons/hi';

/**
 * HomePage - Landing page with hero section and feature cards
 */
const HomePage = () => {
  const features = [
    {
      icon: HiOutlineUserGroup,
      title: 'Student Management',
      desc: 'Add, edit, view, and manage all student records in one centralized system.',
      color: 'from-blue-500 to-indigo-500',
      link: '/students',
    },
    {
      icon: HiOutlineChartBar,
      title: 'Dashboard Analytics',
      desc: 'Real-time statistics and insights about student demographics and attendance.',
      color: 'from-purple-500 to-pink-500',
      link: '/dashboard',
    },
    {
      icon: HiOutlinePlusCircle,
      title: 'Quick Enrollment',
      desc: 'Fast and intuitive forms to add new students with full validation.',
      color: 'from-emerald-500 to-teal-500',
      link: '/students/add',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <HiOutlineAcademicCap className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-medium text-primary-100">MERN Stack Application</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              School Management
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                System
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              A modern, full-featured school management platform to manage student records,
              track attendance, and gain powerful insights — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link to="/dashboard" className="btn-primary text-base px-8 py-3.5 bg-white text-primary-600 hover:bg-gray-100 shadow-xl shadow-white/20 hover:shadow-white/30">
                <span className="flex items-center gap-2">
                  Go to Dashboard
                  <HiArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <Link to="/students" className="px-8 py-3.5 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-200 text-base">
                View Students
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-container -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                Learn more <HiArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="page-container py-16">
        <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to get started?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Begin managing your school's student records with our intuitive, modern interface.
            </p>
            <Link
              to="/students/add"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 shadow-xl transition-all duration-200"
            >
              <HiOutlinePlusCircle className="w-5 h-5" />
              Add Your First Student
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
