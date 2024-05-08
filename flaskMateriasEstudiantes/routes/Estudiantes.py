import psycopg2
from flask import Blueprint, jsonify, request
from models.EstudianteModel import EstudianteModel
from models.entities.Estudiante import Estudiante

main = Blueprint('estudiantes_blueprint', __name__)


@main.route('/', methods=['GET'])
def get_estudiantes():
    try:
        estudiantes = EstudianteModel.get_all_estudiantes()
        return jsonify(estudiantes)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/<id>')
def get_estudiante(id):
    try:
        estudiante = EstudianteModel.get_estudiante(id)
        return estudiante
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/add/new', methods=['POST', 'GET'])
def add_estudiante():
    try:
        if request.method == 'GET':
            return jsonify({'message': 'Ok'}), 201
        else:
            id = request.json['id']
            nombres = request.json['nombres']
            apellidos = request.json['apellidos']
            fecha_nac = request.json['fecha_nac']
            edad = request.json['edad']
            estudiante = Estudiante(id, nombres, apellidos, fecha_nac, edad)
            print(estudiante.id)
            EstudianteModel.add_estudiante(id)
            return jsonify({'message': 'Ok'}), 201

    except (Exception, psycopg2.Error) as error:
        return jsonify({'mensaje': 'Error al agregar el estudiante', 'error': str(error)}), 500


@main.route('/delete/<id>', methods=['DELETE'])
def delete_estudiante(id):
    try:
        affected_rows = EstudianteModel.delete_estudiante(id)
        if affected_rows == 1:
            return jsonify(id)
        else:
            return jsonify({'message': 'Error'}, 500)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/update/<id>', methods=['PATCH'])
def update_estudiante(id):
    try:

        nombres = request.json['nombres']
        apellidos = request.json['apellidos']
        fecha_nac = request.json['fecha_nac']
        edad = request.json['edad']
        estudiante = Estudiante(nombres, apellidos, fecha_nac, edad)
        print(estudiante.id)
        affected_rows = EstudianteModel.update_estudiante(id)
        if affected_rows == 1:
            return jsonify(estudiante.id)
        else:
            return jsonify({'message': 'Error'}, 500)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
