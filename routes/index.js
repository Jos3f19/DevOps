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
    url: '/api/estudiantes/:id',
    handler: estudiantesController.getSingleStudent
  },
  {
    method: 'POST',
    url: '/api/estudiantes',
    handler: estudiantesController.addStudent,
    schema: estudiantesController.addestudiantesSchema
  },
  {
    method: 'PUT',
    url: '/api/estudiantes/:id',
    handler: estudiantesController.updateStudent
  },
  {
    method: 'DELETE',
    url: '/api/estudiantes/:id',
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
    url: '/api/materias/:id',
    handler: materiasController.getSingleMateria
  },
  {
    method: 'POST',
    url: '/api/materias',
    handler: materiasController.addMateria,
    schema: materiasController.materiasSchema
  },
  {
    method: 'PUT',
    url: '/api/materias/:id',
    handler: materiasController.updateMateria
  },
  {
    method: 'DELETE',
    url: '/api/materias/:id',
    handler: materiasController.deleteMateria
  },
  {
    method: 'GET',
    url: '/api/healthcheck',
  }
]
module.exports = routes