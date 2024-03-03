const mongoose = require('mongoose')

const estudiantesSchema = new mongoose.Schema({
  ID: String,
  Nombres: String,
  Apellidos: String,
  Año_Nac: String,
  Edad: Number,
  services: {
    type: Map,
    of: String
  }
})

module.exports = mongoose.model('Estudiantes', estudiantesSchema)