import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineEye,
} from 'react-icons/hi';
import { getStats, getApiErrorMessage } from '../services/api';
import StatsCard from '../components/StatsCard';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * DashboardPage - Overview statistics and recent students
 */
const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await getStats();
      setStats(data.data);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load dashboard data'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  if (error) {
    return (
      <div className="page-container">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button onClick={fetchStats} className="btn-primary mt-4 text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your school's student records</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={HiOutlineUserGroup}
          color="blue"
          subtitle="All enrolled students"
        />
        <StatsCard
          title="Boys"
          value={stats?.boysCount || 0}
          icon={HiOutlineUserGroup}
          color="cyan"
          subtitle="Male students"
        />
        <StatsCard
          title="Girls"
          value={stats?.girlsCount || 0}
          icon={HiOutlineUserGroup}
          color="pink"
          subtitle="Female students"
        />
        <StatsCard
          title="Total Classes"
          value={stats?.totalClasses || 0}
          icon={HiOutlineAcademicCap}
          color="purple"
          subtitle="Active classes"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <HiOutlineChartBar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.avgAttendance || 0}%</p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
              style={{ width: `${stats?.avgAttendance || 0}%` }}
            />
          </div>
        </div>

        {/* Classes List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-500 mb-4">ACTIVE CLASSES</h3>
          <div className="flex flex-wrap gap-2">
            {stats?.classes?.map((cls) => (
              <span
                key={cls}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-semibold border border-primary-100"
              >
                {cls}
              </span>
            ))}
            {(!stats?.classes || stats.classes.length === 0) && (
              <p className="text-gray-400 text-sm">No classes found</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiOutlineClock className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-900">Recently Added Students</h3>
          </div>
          <Link to="/students" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View All →
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Class</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Attendance</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.recentStudents?.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{student.fullName}</p>
                      <p className="text-xs text-gray-400">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold">
                      {student.className}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      student.gender === 'Male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                    }`}>
                      {student.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className={`text-sm font-bold ${
                      student.attendance >= 90 ? 'text-emerald-600' : student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/students/${student._id}`}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-semibold"
                    >
                      <HiOutlineEye className="w-4 h-4" /> View
                    </Link>
                  </td>
                </tr>
              ))}
              {(!stats?.recentStudents || stats.recentStudents.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400 text-sm">
                    No students found. Add your first student to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
