import psycopg2
from flask import Blueprint, jsonify, request
from models.MateriaModel import MateriaModel
from models.entities.Materia import Materia

main = Blueprint('materias_blueprint', __name__)


@main.route('/', methods=['GET'])
def get_materias():
    try:
        materias = MateriaModel.get_all_materias()
        return jsonify(materias)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/<cod_Materia>')
def get_materia(cod_Materia):
    try:
        materia = MateriaModel.get_materia(cod_Materia)
        return materia
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/add/new', methods=['POST', 'GET'])
def add_materia():
    try:
        if request.method == 'GET':
            return jsonify({'message': 'ok'}), 201
        else:
            cod_Materia = request.json['cod_Materia']
            nombre = request.json['nombre']
            materia = Materia(cod_Materia, nombre)
            print(materia.cod_Materia)
            MateriaModel.add_materia(materia)
            return jsonify({'message': 'Ok'}), 201

    except (Exception, psycopg2.Error) as error:
        return jsonify({'mensaje': 'Error al agregar la materia', 'error': str(error)}), 500


@main.route('/delete/<cod_Materia>', methods=['DELETE', 'GET'])
def delete_materia(cod_Materia):
    try:
        affected_rows = MateriaModel.delete_materia(cod_Materia)
        if affected_rows == 1:
            return jsonify(cod_Materia)
        else:
            return jsonify({'message': 'Error'}, 500)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/update/<cod_Materia>', methods=['PATCH'])
def update_materia(cod_Materia):
    try:

        nombre = request.json['nombre']
        materia = Materia(nombre)
        print(materia.cod_Materia)
        affected_rows = MateriaModel.update_materia(cod_Materia)
        if affected_rows == 1:
            return jsonify(materia.cod_Materia)
        else:
            return jsonify({'message': 'Error'}, 500)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
