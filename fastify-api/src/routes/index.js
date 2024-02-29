// Import Controllers
const estudiantesController = require('../controllers/estudiantesController')
const materiasController = require('../controllers/materiasController')

const routes = [
  {
    method: 'GET',
    url: '/api/estudiantes',
    handler: estudiantesController.getStudents
  },
  {
    method: 'GET',
    url: '/api/estudiantes/:ID',
    handler: estudiantesController.getSingleStudent
  },
  
  {
    method: 'POST',
    url: '/api/estudiantes',
    handler: estudiantesController.addStudent
  },
  
  {
    method: 'PUT',
    url: '/api/estudiantes/:ID',
    handler: estudiantesController.updateStudent
  },
  {
    method: 'DELETE',
    url: '/api/estudiantes/:ID',
    handler: estudiantesController.deleteStudent
  },
//              Materias
  {
    method: 'GET',
    url: '/api/materias',
    handler: materiasController.getMaterias
  },
  {
    method: 'GET',
    url: '/api/materias/:codigoMateria',
    handler: materiasController.getSingleMateria
  },

  {
    method: 'POST',
    url: '/api/materias',
    handler: materiasController.addMateria,
  },

  {
    method: 'PUT',
    url: '/api/materias/:codigoMateria',
    handler: materiasController.updateMateria
  },
  {
    method: 'DELETE',
    url: '/api/materias/:codigoMateria',
    handler: materiasController.deleteMateria
  }
]

module.exports = routes