const mongoose = require('mongoose')

const materiasSchema = new mongoose.Schema({
  codigoMateria: String,
  Nombre: String,
})

module.exports = mongoose.model('Materias', materiasSchema)