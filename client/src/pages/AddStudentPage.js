import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { createStudent, getApiErrorMessage } from '../services/api';
import StudentForm from '../components/StudentForm';

/**
 * AddStudentPage - Form to add a new student
 */
const AddStudentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await createStudent(formData);
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to add student'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <Link
        to="/students"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm font-semibold mb-6 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Students
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-blue-700 px-6 py-5">
            <h1 className="text-xl font-bold text-white">Add New Student</h1>
            <p className="text-blue-100 text-sm mt-1">Fill in the details below to enroll a new student.</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <StudentForm onSubmit={handleSubmit} isLoading={isLoading} submitLabel="Add Student" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentPage;
