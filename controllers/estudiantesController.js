// External Dependancies
const boom = require('boom')

// Get Data Models
const Estudiantes = require('../models/Estudiantes')

// Get all Students
exports.getStudents = async (req, reply) => {
  try {
    const students = await Estudiantes.find()
    return students
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single student by ID
exports.getSingleStudent = async (req, reply) => {
  try {
    const id = req.params.id
    const student = await Estudiantes.findById(id)
    return student
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new student
exports.addStudent = async (req, reply) => {
  try {
    const student = new Estudiantes(req.body)
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
    const update = await Estudiantes.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a student
exports.deleteStudent = async (req, reply) => {
  try {
    const id = req.params.id
    const student = await Estudiantes.findByIdAndDelete(id)
    return student
  } catch (err) {
    throw boom.boomify(err)
  }
}