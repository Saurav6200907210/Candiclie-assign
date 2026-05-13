import React, { useState, useEffect } from 'react';

/** Stable component — must not be defined inside StudentForm or inputs remount every keystroke. */
function FormInputField({ label, name, type, placeholder, value, onChange, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}

/**
 * StudentForm - Reusable form for Add/Edit student
 */
const StudentForm = ({ initialData, onSubmit, isLoading, submitLabel = 'Save Student' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    className: '',
    email: '',
    phone: '',
    address: '',
    attendance: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        age: initialData.age ?? '',
        gender: initialData.gender || '',
        className: initialData.className || '',
        email: initialData.email || '',
        phone: initialData.phone != null ? String(initialData.phone).replace(/\D/g, '').slice(0, 10) : '',
        address: initialData.address || '',
        attendance: initialData.attendance ?? '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.age || formData.age < 3 || formData.age > 25) newErrors.age = 'Age must be between 3 and 25';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.className.trim()) newErrors.className = 'Class is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Enter exactly 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.attendance !== '' && (Number(formData.attendance) < 0 || Number(formData.attendance) > 100))
      newErrors.attendance = 'Attendance must be between 0 and 100';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        age: Number(formData.age),
        attendance: formData.attendance !== '' ? Number(formData.attendance) : 0,
      });
    }
  };

  const classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInputField
          label="Full Name"
          name="fullName"
          placeholder="e.g. Aarav Sharma"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <FormInputField
          label="Age"
          name="age"
          type="number"
          placeholder="e.g. 16"
          min={3}
          max={25}
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`input-field ${errors.gender ? 'border-red-400' : ''}`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs font-medium mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class</label>
          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className={`input-field ${errors.className ? 'border-red-400' : ''}`}
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          {errors.className && <p className="text-red-500 text-xs font-medium mt-1">{errors.className}</p>}
        </div>

        <FormInputField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g. student@school.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInputField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          placeholder="10-digit number"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormInputField
          label="Attendance (%)"
          name="attendance"
          type="number"
          placeholder="e.g. 90"
          min={0}
          max={100}
          value={formData.attendance}
          onChange={handleChange}
          error={errors.attendance}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g. 12 MG Road, New Delhi"
          rows={3}
          className={`input-field resize-none ${errors.address ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`}
        />
        {errors.address && <p className="text-red-500 text-xs font-medium mt-1">{errors.address}</p>}
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={isLoading} className="btn-primary disabled:opacity-60 min-w-[180px]">
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Saving...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
