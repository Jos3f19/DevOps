const mongoose = require('mongoose')

const materiasSchema = new mongoose.Schema({
  codigoMateria: String,
  Nombre: String,
  services: {
    type: Map,
    of: String
  }
})

module.exports = mongoose.model('Materias', materiasSchema)