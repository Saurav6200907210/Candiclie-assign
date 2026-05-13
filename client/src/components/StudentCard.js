import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

/**
 * StudentCard - Card UI for individual student in listing
 */
const StudentCard = ({ student, onDelete }) => {
  const getGenderColor = (gender) => {
    if (gender === 'Male') return 'bg-blue-100 text-blue-700';
    if (gender === 'Female') return 'bg-pink-100 text-pink-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getAttendanceColor = (att) => {
    if (att >= 90) return 'text-emerald-600';
    if (att >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const gradients = [
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-cyan-500 to-blue-500',
  ];

  const gradient = gradients[student.fullName.length % gradients.length];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}
        >
          {getInitials(student.fullName)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base truncate">{student.fullName}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{student.email}</p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold">
              {student.className}
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getGenderColor(student.gender)}`}>
              {student.gender}
            </span>
            <span className={`text-xs font-bold ${getAttendanceColor(student.attendance)}`}>
              {student.attendance}% Att.
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
        <Link
          to={`/students/${student._id}`}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 text-primary-600 text-xs font-semibold hover:bg-primary-100 transition-colors"
        >
          <HiOutlineEye className="w-4 h-4" />
          View
        </Link>
        <Link
          to={`/students/edit/${student._id}`}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-600 text-xs font-semibold hover:bg-amber-100 transition-colors"
        >
          <HiOutlinePencil className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={() => onDelete(student._id, student.fullName)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
        >
          <HiOutlineTrash className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
