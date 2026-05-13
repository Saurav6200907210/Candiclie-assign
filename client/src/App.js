import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';
import StudentDetailsPage from './pages/StudentDetailsPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f5ff]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/add" element={<AddStudentPage />} />
          <Route path="/students/edit/:id" element={<EditStudentPage />} />
          <Route path="/students/:id" element={<StudentDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
