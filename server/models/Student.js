const mongoose = require('mongoose');

/**
 * Student Schema - Defines the data structure for students in MongoDB
 */
const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [3, 'Age must be at least 3'],
      max: [25, 'Age cannot exceed 25'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    className: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    attendance: {
      type: Number,
      default: 0,
      min: [0, 'Attendance cannot be negative'],
      max: [100, 'Attendance cannot exceed 100'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Student', studentSchema);
