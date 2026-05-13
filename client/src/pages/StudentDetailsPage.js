import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { getStudentById, deleteStudent, getApiErrorMessage } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * StudentDetailsPage - View full details of a single student
 */
const StudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const { data } = await getStudentById(id);
      setStudent(data.data);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load student details'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteStudent(id);
      toast.success('Student deleted successfully');
      navigate('/students');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to delete'));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading student details..." />;

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

  const getAttendanceColor = (att) => {
    if (att >= 90) return 'from-emerald-500 to-teal-500';
    if (att >= 75) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const gradients = [
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-cyan-500 to-blue-500',
  ];
  const gradient = gradients[(student?.fullName?.length || 0) % gradients.length];

  return (
    <div className="page-container animate-fade-in">
      {/* Back Button */}
      <Link
        to="/students"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm font-semibold mb-6 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Students
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header Gradient */}
            <div className={`h-28 bg-gradient-to-br ${gradient} relative`}>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <span className={`text-2xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                    {student?.fullName?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-14 pb-6 px-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{student?.fullName}</h2>
              <span className="inline-block mt-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold">
                {student?.className}
              </span>

              {/* Quick Info */}
              <div className="mt-6 space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <HiOutlineMail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 truncate">{student?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <HiOutlinePhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{student?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <HiOutlineLocationMarker className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{student?.address}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Link
                  to={`/students/edit/${student?._id}`}
                  className="flex-1 btn-secondary text-sm py-2.5 flex items-center justify-center gap-1.5"
                >
                  <HiOutlinePencil className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 btn-danger text-sm py-2.5 flex items-center justify-center gap-1.5"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Student Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoItem icon={HiOutlineAcademicCap} label="Full Name" value={student?.fullName} />
              <InfoItem icon={HiOutlineCalendar} label="Age" value={`${student?.age} years`} />
              <InfoItem
                label="Gender"
                value={student?.gender}
                badge
                badgeColor={student?.gender === 'Male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}
              />
              <InfoItem icon={HiOutlineAcademicCap} label="Class" value={student?.className} />
              <InfoItem icon={HiOutlineMail} label="Email" value={student?.email} />
              <InfoItem icon={HiOutlinePhone} label="Phone" value={student?.phone} />
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Attendance Record</h3>
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAttendanceColor(student?.attendance)} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl font-bold text-white">{student?.attendance}%</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-2">Overall Attendance</p>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getAttendanceColor(student?.attendance)} rounded-full transition-all duration-1000`}
                    style={{ width: `${student?.attendance || 0}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {student?.attendance >= 90
                    ? '✨ Excellent attendance!'
                    : student?.attendance >= 75
                    ? '⚡ Good, keep it up!'
                    : '⚠️ Needs improvement'}
                </p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs text-gray-400 font-medium">Created</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">
                  {student?.createdAt ? new Date(student.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Last Updated</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">
                  {student?.updatedAt ? new Date(student.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Student"
        message={`Are you sure you want to delete "${student?.fullName}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={deleting}
      />
    </div>
  );
};

/** Helper component for info items */
const InfoItem = ({ icon: Icon, label, value, badge, badgeColor }) => (
  <div>
    <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
    {badge ? (
      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${badgeColor}`}>{value}</span>
    ) : (
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    )}
  </div>
);

export default StudentDetailsPage;
