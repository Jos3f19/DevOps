// External Dependancies
const boom = require('boom')

// Get Data Models
const Materias = require('../models/Materias')

// Get all Materias
exports.getMaterias = async (req, reply) => {
  try {
    const materias = await Materias.find()
    return materias
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single Materias by codigoMateria
exports.getSingleMateria = async (req, reply) => {
  try {
    const codigoMateria = req.params.id
    const materia = await Materias.findById(codigoMateria)
    return materia
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new Materia
exports.addMateria = async (req, reply) => {
  try {
    const materia = new Materias(req.body)
    return materia.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing Materia
exports.updateMateria = async (req, reply) => {
  try {
    const codigoMateria = req.params.id
    const materia = req.body
    const { ...updateData } = materia
    const update = await Materias.findByIdAndUpdate(codigoMateria, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a Materia
exports.deleteMateria = async (req, reply) => {
  try {
    const codigoMateria = req.params.id
    const materia = await Materias.findByIdAndRemove(codigoMateria)
    return materia
  } catch (err) {
    throw boom.boomify(err)
  }
}