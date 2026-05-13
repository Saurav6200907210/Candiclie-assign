import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { getStudentById, updateStudent, getApiErrorMessage } from '../services/api';
import StudentForm from '../components/StudentForm';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * EditStudentPage - Edit an existing student
 */
const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await getStudentById(id);
        setStudent(data.data);
      } catch (err) {
        setError(getApiErrorMessage(err, 'Failed to load student'));
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await updateStudent(id, formData);
      toast.success('Student updated successfully!');
      navigate(`/students/${id}`);
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to update student'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading student data..." />;

  if (error) {
    return (
      <div className="page-container">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <Link to="/students" className="btn-primary mt-4 text-sm inline-block">Back to Students</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <Link
        to={`/students/${id}`}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm font-semibold mb-6 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Student
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
            <h1 className="text-xl font-bold text-white">Edit Student</h1>
            <p className="text-amber-100 text-sm mt-1">Update the details for {student?.fullName}.</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <StudentForm
              initialData={student}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              submitLabel="Update Student"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;
