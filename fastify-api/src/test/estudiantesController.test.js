// Importing the boom module for handling HTTP errors
const boom = require('boom')
// Importing the estudiantesController module which contains functions to handle operations
const estudiantesController = require('../controllers/estudiantesController')
const Estudiantes = require('../models/Estudiantes')

// Test suite for estudiantesController
describe('estudiantesController', () => {
    // Test suite for the getStudents function
    describe('getStudents', () => {
        // Test case: should return all students
        it('should return all students', async () => {
            // Mocking request and reply objects
            const req = {}
            const reply = {}
            // Expected list of students
            const expectedStudents = [{ name: 'John' }, { name: 'Jane' }]
            // Mocking the Estudiantes.find method to return expectedStudents
            Estudiantes.find = jest.fn().mockResolvedValue(expectedStudents)

            // Calling the getStudents function and storing the result
            const result = await estudiantesController.getStudents(req, reply)

            // Expecting the result to be equal to expectedStudents
            expect(result).toEqual(expectedStudents)
            // Expecting Estudiantes.find to be called once
            expect(Estudiantes.find).toHaveBeenCalledTimes(1)
        })
    })

    // Test suite for the getSingleStudent function
    describe('getSingleStudent', () => {
        // Test case: should return a single student by ID
        it('should return a single student by ID', async () => {
            // Mocking request object with student ID
            const req = { params: { id: '123' } }
            const reply = {}
            // Expected student object
            const expectedStudent = { name: 'John' }
            // Mocking the Estudiantes.findById method to return expectedStudent
            Estudiantes.findById = jest.fn().mockResolvedValue(expectedStudent)

            // Calling the getSingleStudent function and storing the result
            const result = await estudiantesController.getSingleStudent(req, reply)

            // Expecting the result to be equal to expectedStudent
            expect(result).toEqual(expectedStudent)
            // Expecting Estudiantes.findById to be called once
            expect(Estudiantes.findById).toHaveBeenCalledTimes(1)
            // Expecting Estudiantes.findById to be called with '123'
            expect(Estudiantes.findById).toHaveBeenCalledWith('123')
        })
    })

    /*
    // Test suite for the addStudent function
    describe('addStudent', () => {
        // Test case: should add a new student
        it('should add a new student', async () => {
            // Mocking request and reply objects
            const req = {}
            const reply = {}
            // New student object
            const newStudent = { name: 'John' }
            // Mocking the Estudiantes.create method to return newStudent
            Estudiantes.create = jest.fn().mockResolvedValue(newStudent)

            // Calling the addStudent function and storing the result
            const result = await estudiantesController.addStudent(req, reply)

            // Expecting the result to be equal to newStudent
            expect(result).toEqual(newStudent)
            // Expecting Estudiantes.create to be called once
            expect(Estudiantes.create).toHaveBeenCalledTimes(1)
            // Expecting Estudiantes.create to be called with req.body
            expect(Estudiantes.create).toHaveBeenCalledWith(req.body)
        })
    })
    */

    // Test suite for the updateStudent function
    describe('updateStudent', () => {
        // Test case: should update an existing student
        it('should update an existing student', async () => {
            // Mocking request object with student ID and updated data
            const req = { params: { id: '123' }, body: { name: 'John' } }
            const reply = {}
            // Updated student object
            const updatedStudent = { name: 'John', age: 25 }
            // Mocking the Estudiantes.findByIdAndUpdate method to return updatedStudent
            Estudiantes.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedStudent)

            // Calling the updateStudent function and storing the result
            const result = await estudiantesController.updateStudent(req, reply)

            // Expecting the result to be equal to updatedStudent
            expect(result).toEqual(updatedStudent)
            // Expecting Estudiantes.findByIdAndUpdate to be called once
            expect(Estudiantes.findByIdAndUpdate).toHaveBeenCalledTimes(1)
            // Expecting Estudiantes.findByIdAndUpdate to be called with '123', req.body, and { new: true }
            expect(Estudiantes.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true })
        })
    })

    // Test suite for the deleteStudent function
    describe('deleteStudent', () => {
        // Test case: should delete a student
        it('should delete a student', async () => {
            // Mocking request object with student ID
            const req = { params: { id: '123' } }
            const reply = {}
            // Deleted student object
            const deletedStudent = { name: 'John' }
            // Mocking the Estudiantes.findByIdAndDelete method to return deletedStudent
            Estudiantes.findByIdAndDelete = jest.fn().mockResolvedValue(deletedStudent)

            // Calling the deleteStudent function and storing the result
            const result = await estudiantesController.deleteStudent(req, reply)

            // Expecting the result to be equal to deletedStudent
            expect(result).toEqual(deletedStudent)
            // Expecting Estudiantes.findByIdAndDelete to be called once
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledTimes(1)
            // Expecting Estudiantes.findByIdAndDelete to be called with '123'
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledWith('123')
        })

        // Test case: should throw an error if deletion fails
        it('should throw an error if deletion fails', async () => {
            // Mocking request object with student ID
            const req = { params: { id: '123' } }
            const reply = {}
            // Error object for deletion failure
            const error = new Error('Deletion failed')
            // Mocking the Estudiantes.findByIdAndDelete method to reject with error
            Estudiantes.findByIdAndDelete = jest.fn().mockRejectedValue(error)

            // Expecting a rejection with boom.Boom when deleteStudent is called
            await expect(estudiantesController.deleteStudent(req, reply)).rejects.toThrow(boom.Boom)

            // Expecting Estudiantes.findByIdAndDelete to be called once
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledTimes(1)
            // Expecting Estudiantes.findByIdAndDelete to be called with '123'
            expect(Estudiantes.findByIdAndDelete).toHaveBeenCalledWith('123')
        })
    })
})
