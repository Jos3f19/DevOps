// Import the necessary dependencies and modules for testing
const boom = require('boom')
const Materias = require('../models/Materias')
const {
    getMaterias,
    getSingleMateria,
    addMateria,
    updateMateria,
    deleteMateria
} = require('../controllers/materiasController')

// Mock the request and reply objects
const req = {}
const reply = {}

// Unit test for getMaterias function
describe('getMaterias', () => {
    it('should return all Materias', async () => {
        // Mock the Materias.find() method
        Materias.find = jest.fn().mockResolvedValueOnce(['Materia 1', 'Materia 2'])

        // Call the getMaterias function
        const result = await getMaterias(req, reply)

        // Assert the result
        expect(result).toEqual(['Materia 1', 'Materia 2'])
        expect(Materias.find).toHaveBeenCalledTimes(1)
    })
})

// Unit test for getSingleMateria function
describe('getSingleMateria', () => {
    it('should return a single Materia by codigoMateria', async () => {
        // Mock the Materias.findById() method
        Materias.findById = jest.fn().mockResolvedValueOnce('Materia 1')

        // Set the request parameters
        req.params = { id: 'materiaId' }

        // Call the getSingleMateria function
        const result = await getSingleMateria(req, reply)

        // Assert the result
        expect(result).toEqual('Materia 1')
        expect(Materias.findById).toHaveBeenCalledTimes(1)
        expect(Materias.findById).toHaveBeenCalledWith('materiaId')
    })
})

// Unit test for addMateria function
describe('addMateria', () => {
    it('should add a new Materia', async () => {
        // Mock the Materias.create() method
        Materias.create = jest.fn().mockResolvedValueOnce('New Materia')

        // Set the request body
        req.body = { name: 'Materia 1' }

        // Call the addMateria function
        const result = await addMateria(req, reply)

        // Assert the result
        expect(result).toEqual('New Materia')
        expect(Materias.create).toHaveBeenCalledTimes(1)
        expect(Materias.create).toHaveBeenCalledWith({ name: 'Materia 1' })
    })
})

// Unit test for updateMateria function
describe('updateMateria', () => {
    it('should update an existing Materia', async () => {
        // Mock the Materias.findByIdAndUpdate() method
        Materias.findByIdAndUpdate = jest.fn().mockResolvedValueOnce('Updated Materia')

        // Set the request parameters and body
        req.params = { id: 'materiaId' }
        req.body = { name: 'Updated Materia' }

        // Call the updateMateria function
        const result = await updateMateria(req, reply)

        // Assert the result
        expect(result).toEqual('Updated Materia')
        expect(Materias.findByIdAndUpdate).toHaveBeenCalledTimes(1)
        expect(Materias.findByIdAndUpdate).toHaveBeenCalledWith('materiaId', { name: 'Updated Materia' })
    })
})

// Unit test for deleteMateria function
describe('deleteMateria', () => {
    it('should delete a Materia', async () => {
        // Mock the Materias.findByIdAndDelete() method
        Materias.findByIdAndDelete = jest.fn().mockResolvedValueOnce('Deleted Materia')

        // Set the request parameters
        req.params = { id: 'materiaId' }

        // Call the deleteMateria function
        const result = await deleteMateria(req, reply)

        // Assert the result
        expect(result).toEqual('Deleted Materia')
        expect(Materias.findByIdAndDelete).toHaveBeenCalledTimes(1)
        expect(Materias.findByIdAndDelete).toHaveBeenCalledWith('materiaId')
    })

    it('should throw an error if deletion fails', async () => {
        // Mock the Materias.findByIdAndDelete() method to throw an error
        Materias.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error('Deletion failed'))

        // Set the request parameters
        req.params = { id: 'materiaId' }

        // Call the deleteMateria function and expect it to throw an error
        await expect(deleteMateria(req, reply)).rejects.toThrow(boom.Boom)
        expect(Materias.findByIdAndDelete).toHaveBeenCalledTimes(1)
        expect(Materias.findByIdAndDelete).toHaveBeenCalledWith('materiaId')
    })
})
