const estudiantesController = require('../controllers/estudiantesController')
const Estudiantes = require('../models/Estudiantes')
const boom = require('boom')

describe('estudiantesController', () => {
    describe('getStudents', () => {
        it('should return all students', async () => {
            const req = {}
            const reply = {}
            const expectedStudents = [{ name: 'John' }, { name: 'Jane' }]
            Estudiantes.find = jest.fn().mockResolvedValue(expectedStudents)

            const result = await estudiantesController.getStudents(req, reply)

            expect(result).toEqual(expectedStudents)
            expect(Estudiantes.find).toHaveBeenCalledTimes(1)
        })
    })

    describe('getSingleStudent', () => {
        it('should return a single student by ID', async () => {
            const req = { params: { id: '123' } }
            const reply = {}
            const expectedStudent = { name: 'John' }
            Estudiantes.findById = jest.fn().mockResolvedValue(expectedStudent)

            const result = await estudiantesController.getSingleStudent(req, reply)

            expect(result).toEqual(expectedStudent)
            expect(Estudiantes.findById).toHaveBeenCalledTimes(1)
            expect(Estudiantes.findById).toHaveBeenCalledWith('123')
        })
    })

    describe('addStudent', () => {
        it('should add a new student', async () => {
            const req = {}
            const reply = {}
            const newStudent = { name: 'John' }
            Estudiantes.create = jest.fn().mockResolvedValue(newStudent)

            const result = await estudiantesController.addStudent(req, reply)

            expect(result).toEqual(newStudent)
            expect(Estudiantes.create).toHaveBeenCalledTimes(1)
            expect(Estudiantes.create).toHaveBeenCalledWith(req.body)
        })
    })

    describe('updateStudent', () => {
        it('should update an existing student', async () => {
            const req = { params: { id: '123' }, body: { name: 'John' } }
            const reply = {}
            const updatedStudent = { name: 'John', age: 25 }
            Estudiantes.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedStudent)

            const result = await estudiantesController.updateStudent(req, reply)

            expect(result).toEqual(updatedStudent)
            expect(Estudiantes.findByIdAndUpdate).toHaveBeenCalledTimes(1)
            expect(Estudiantes.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true })
        })
    })

    describe('deleteStudent', () => {
        it('should delete a student', async () => {
            const req = { params: { id: '123' } }
            const reply = {}
            const deletedStudent = { name: 'John' }
            Estudiantes.findByIdAndDelete = jest.fn().mockResolvedValue(deletedStudent)

            const result = await estudiantesController.deleteStudent(req, reply)

            expect(result).toEqual(deletedStudent)
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledTimes(1)
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledWith('123')
        })

        it('should throw an error if deletion fails', async () => {
            const req = { params: { id: '123' } }
            const reply = {}
            const error = new Error('Deletion failed')
            Estudiantes.findByIdAndDelete = jest.fn().mockRejectedValue(error)

            await expect(estudiantesController.deleteStudent(req, reply)).rejects.toThrow(boom.Boom)

            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledTimes(1)
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledWith('123')
        })
    })
})
