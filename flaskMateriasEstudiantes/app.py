from flask import Flask, jsonify
from routes import Materias, Estudiantes
from flask import Blueprint, jsonify, request
from models.MateriaModel import MateriaModel
from models.entities.Materia import Materia
from models.entities.Estudiante import Estudiante
from models.EstudianteModel import EstudianteModel
import os

app = Flask(__name__)


def page_not_found(e):
    return "<h1>404 Page not found</h1>", 404



@app.route("/health", methods=["GET"])
def health():
    return jsonify({"Status de la API Materias Estudiantes": "200 Corriendo",
                    "Status de la BD de Materias y Estudiantes": "Sirviendo al 200%"})


@app.route("/", methods=["GET"])
def hello_world():
    return "Esta es la API de Materias y Estudiantes"


app.register_blueprint(Materias.main, url_prefix='/api/materias')
app.register_blueprint(Estudiantes.main, url_prefix='/api/estudiantes')
# Set-Ups
if __name__ == '__main__':
    # app.config.from_object(configuration['development'])
    # Blueprints

    app.register_blueprint(Materias.main, url_prefix='/api/materia')
    app.register_blueprint(Estudiantes.main, url_prefix='/api/estudiante')
    app.register_error_handler(404, page_not_found)
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 443)), use_reloader=False)