import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePlusCircle,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { getAllStudents, deleteStudent, getStats, getApiErrorMessage } from '../services/api';
import StudentCard from '../components/StudentCard';
import SearchBar from '../components/SearchBar';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * StudentsPage - List all students with search, filter, and CRUD actions
 */
const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [classes, setClasses] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [deleting, setDeleting] = useState(false);

  // Fetch classes for filter
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await getStats();
        setClasses(data.data.classes || []);
      } catch (err) {
        console.error('Failed to fetch classes');
      }
    };
    fetchClasses();
  }, []);

  // Fetch students with debounced search
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (classFilter !== 'All') params.className = classFilter;
      if (genderFilter !== 'All') params.gender = genderFilter;

      const { data } = await getAllStudents(params);
      setStudents(data.data);
      setError('');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to fetch students'));
    } finally {
      setLoading(false);
    }
  }, [search, classFilter, genderFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, 300);
    return () => clearTimeout(timer);
  }, [fetchStudents]);

  // Delete handler
  const handleDeleteClick = (id, name) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteStudent(deleteModal.id);
      toast.success(`${deleteModal.name} has been deleted`);
      setDeleteModal({ isOpen: false, id: null, name: '' });
      fetchStudents();
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to delete student'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold text-primary-600 mb-1">3. Student Listing Page</p>
          <h1 className="text-3xl font-bold text-gray-900">Student Listing</h1>
          <p className="text-gray-500 mt-1">
            Search, filter, view, edit, and delete student records.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-400'}`}
            >
              <HiOutlineViewGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-400'}`}
            >
              <HiOutlineViewList className="w-5 h-5" />
            </button>
          </div>

          <Link to="/students/add" className="btn-primary flex items-center gap-2 text-sm">
            <HiOutlinePlusCircle className="w-5 h-5" />
            Add Student
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        classes={classes}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">Showing</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{students.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">Class Filter</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{classFilter}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-gray-400">Gender Filter</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{genderFilter}</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner text="Loading students..." />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button onClick={fetchStudents} className="btn-primary mt-4 text-sm">
            Retry
          </button>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiOutlineViewGrid className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-500 text-sm mb-6">
            {search || classFilter !== 'All' || genderFilter !== 'All'
              ? 'Try adjusting your search or filters.'
              : 'Get started by adding your first student.'}
          </p>
          <Link to="/students/add" className="btn-primary text-sm inline-flex items-center gap-2">
            <HiOutlinePlusCircle className="w-5 h-5" />
            Add Student
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {students.map((student) => (
            <StudentCard key={student._id} student={student} onDelete={handleDeleteClick} />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-gray-900">All Students</h2>
              <p className="text-sm text-gray-500">
                {students.length} record{students.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <Link to="/students/add" className="btn-secondary inline-flex items-center justify-center gap-2 text-sm">
              <HiOutlinePlusCircle className="w-5 h-5" />
              Add Student
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Age</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Gender</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Attendance</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{student.fullName}</p>
                        <p className="text-xs text-gray-400 max-w-[220px] truncate">{student.address}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-700">{student.age}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold">
                        {student.className}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${student.gender === 'Male' ? 'bg-blue-50 text-blue-700' : student.gender === 'Female' ? 'bg-pink-50 text-pink-700' : 'bg-gray-100 text-gray-700'}`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1 text-xs text-gray-500">
                        <p className="flex items-center gap-1.5">
                          <HiOutlineMail className="w-4 h-4 text-gray-400" />
                          <span className="max-w-[190px] truncate">{student.email}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <HiOutlinePhone className="w-4 h-4 text-gray-400" />
                          {student.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${student.attendance >= 90 ? 'text-emerald-600' : student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/students/${student._id}`} className="text-primary-600 hover:text-primary-700 text-xs font-semibold">View</Link>
                        <Link to={`/students/edit/${student._id}`} className="text-amber-600 hover:text-amber-700 text-xs font-semibold">Edit</Link>
                        <button onClick={() => handleDeleteClick(student._id, student.fullName)} className="text-red-600 hover:text-red-700 text-xs font-semibold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Student"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
        isLoading={deleting}
      />
    </div>
  );
};

export default StudentsPage;
