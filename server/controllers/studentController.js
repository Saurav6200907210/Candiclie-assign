const Student = require('../models/Student');

/**
 * @desc    Get all students with optional search and filter
 * @route   GET /api/students
 * @access  Public
 */
const getStudents = async (req, res) => {
  try {
    const { search, className, gender, page = 1, limit = 50 } = req.query;

    // Build query object
    let query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { className: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (className && className !== 'All') {
      query.className = className;
    }

    if (gender && gender !== 'All') {
      query.gender = gender;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get a single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student, message: 'Student added successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A student with this email already exists.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a student by ID
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student, message: 'Student updated successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a student by ID
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Student deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/students/stats
 * @access  Public
 */
const getStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const boysCount = await Student.countDocuments({ gender: 'Male' });
    const girlsCount = await Student.countDocuments({ gender: 'Female' });
    const classes = await Student.distinct('className');
    const recentStudents = await Student.find().sort({ createdAt: -1 }).limit(5);
    const avgAttendance = await Student.aggregate([
      { $group: { _id: null, avg: { $avg: '$attendance' } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        boysCount,
        girlsCount,
        totalClasses: classes.length,
        classes,
        recentStudents,
        avgAttendance: avgAttendance[0]?.avg?.toFixed(1) || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, getStats };
