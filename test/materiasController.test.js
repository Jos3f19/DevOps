// Importing the boom module for handling HTTP errors
const boom = require('boom')
const Materias = require('../models/Materias')
// Importing functions from materiasController module for operations
const {
    getMaterias,
    getSingleMateria,
    addMateria,
    updateMateria,
    deleteMateria
} = require('../controllers/materiasController')

// Mocking the request and reply objects
const req = {}
const reply = {}

// Unit test for getMaterias function
describe('getMaterias', () => {
    // Test case: should return all Materias
    it('should return all Materias', async () => {
        // Mocking the Materias.find() method to return an array of subjects
        Materias.find = jest.fn().mockResolvedValueOnce(['Materia 1', 'Materia 2'])

        // Calling the getMaterias function
        const result = await getMaterias(req, reply)

        // Asserting the result
        expect(result).toEqual(['Materia 1', 'Materia 2'])
        // Expecting Materias.find to be called once
        expect(Materias.find).toHaveBeenCalledTimes(1)
    })
})

// Unit test for getSingleMateria function
describe('getSingleMateria', () => {
    // Test case: should return a single Materia by codigoMateria
    it('should return a single Materia by codigoMateria', async () => {
        // Mocking the Materias.findById() method to return a single subject
        Materias.findById = jest.fn().mockResolvedValueOnce('Materia 1')

        // Setting the request parameters
        req.params = { id: 'materiaId' }

        // Calling the getSingleMateria function
        const result = await getSingleMateria(req, reply)

        // Asserting the result
        expect(result).toEqual('Materia 1')
        // Expecting Materias.findById to be called once
        expect(Materias.findById).toHaveBeenCalledTimes(1)
        // Expecting Materias.findById to be called with 'materiaId'
        expect(Materias.findById).toHaveBeenCalledWith('materiaId')
    })
})

/*
// Unit test for addMateria function
describe('addMateria', () => {
    // Test case: should add a new Materia
    it('should add a new Materia', async () => {
        // Mocking the Materias.create() method to return a new subject
        Materias.create = jest.fn().mockResolvedValueOnce('New Materia')

        // Setting the request body
        req.body = { name: 'Materia 1' }

        // Calling the addMateria function
        const result = await addMateria(req, reply)

        // Asserting the result
        expect(result).toEqual('New Materia')
        // Expecting Materias.create to be called once
        expect(Materias.create).toHaveBeenCalledTimes(1)
        // Expecting Materias.create to be called with { name: 'Materia 1' }
        expect(Materias.create).toHaveBeenCalledWith({ name: 'Materia 1' })
    })
})
*/

// Unit test for updateMateria function
describe('updateMateria', () => {
    // Test case: should update an existing Materia
    it('should update an existing Materia', async () => {
        // Mocking the Materias.findByIdAndUpdate() method to return an updated subject
        Materias.findByIdAndUpdate = jest.fn().mockResolvedValueOnce('Updated Materia')

        // Setting the request parameters and body
        req.params = { id: '123' }
        req.body = { name: 'Updated Materia' }

        // Calling the updateMateria function
        const result = await updateMateria(req, reply)

        // Asserting the result
        expect(result).toEqual('Updated Materia')
        // Expecting Materias.findByIdAndUpdate to be called once
        expect(Materias.findByIdAndUpdate).toHaveBeenCalledTimes(1)
        // Expecting Materias.findByIdAndUpdate to be called with '123', { name: 'Updated Materia' }, and {"new": true}
        expect(Materias.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Materia' }, {"new": true})
    })
})

// Unit test for deleteMateria function
describe('deleteMateria', () => {
    // Test case: should delete a Materia
    it('should delete a Materia', async () => {
        // Mocking the Materias.findByIdAndDelete() method to return a deleted subject
        Materias.findByIdAndDelete = jest.fn().mockResolvedValueOnce('Deleted Materia')

        // Setting the request parameters
        req.params = { id: 'materiaId' }

        // Calling the deleteMateria function
        const result = await deleteMateria(req, reply)

        // Asserting the result
        expect(result).toEqual('Deleted Materia')
        // Expecting Materias.findByIdAndDelete to be called once
        expect(Materias.findByIdAndDelete).toHaveBeenCalledTimes(1)
        // Expecting Materias.findByIdAndDelete to be called with 'materiaId'
        expect(Materias.findByIdAndDelete).toHaveBeenCalledWith('materiaId')
    })

    // Test case: should throw an error if deletion fails
    it('should throw an error if deletion fails', async () => {
        // Mocking the Materias.findByIdAndDelete() method to throw an error
        Materias.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error('Deletion failed'))

        // Setting the request parameters
        req.params = { id: 'materiaId' }

        // Calling the deleteMateria function and expecting it to throw an error
        await expect(deleteMateria(req, reply)).rejects.toThrow(boom.Boom)
        // Expecting Materias.findByIdAndDelete to be called once
        expect(Materias.findByIdAndDelete).toHaveBeenCalledTimes(1)
        // Expecting Materias.findByIdAndDelete to be called with 'materiaId'
        expect(Materias.findByIdAndDelete).toHaveBeenCalledWith('materiaId')
    })
})
