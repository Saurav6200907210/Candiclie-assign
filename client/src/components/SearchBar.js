import React from 'react';
import { HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi';

/**
 * SearchBar - Search input with class/gender filter dropdowns
 */
const SearchBar = ({ search, setSearch, classFilter, setClassFilter, genderFilter, setGenderFilter, classes }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or class..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 text-sm font-medium text-gray-700"
          />
        </div>

        {/* Class Filter */}
        <div className="relative">
          <HiOutlineFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="pl-9 pr-8 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 text-sm font-medium text-gray-700 appearance-none cursor-pointer min-w-[140px]"
          >
            <option value="All">All Classes</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 text-sm font-medium text-gray-700 appearance-none cursor-pointer min-w-[130px]"
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
