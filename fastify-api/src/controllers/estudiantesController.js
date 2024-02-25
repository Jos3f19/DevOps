// External Dependancies
const boom = require('boom')

// Get Data Models
const Students = require('../models/Estudiantes')

// Get all Students
exports.getStudents = async (req, reply) => {
  try {
    const students = await Students.find()
    return students
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single student by ID
exports.getSingleStudent = async (req, reply) => {
  try {
    const id = req.params.id
    const student = await Students.findById(id)
    return student
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new student
exports.addStudent = async (req, reply) => {
  try {
    const student = new Students(req.body)
    return student.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing student
exports.updateStudent = async (req, reply) => {
  try {
    const id = req.params.id
    const student = req.body
    const { ...updateData } = student
    const update = await Students.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a student
exports.deleteStudent = async (req, reply) => {
  try {
    const id = req.params.id
    const student = await Students.findByIdAndRemove(id)
    return student
  } catch (err) {
    throw boom.boomify(err)
  }
}