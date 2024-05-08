from database.db import get_connection
from .entities.Estudiante import Estudiante


class EstudianteModel:

    @classmethod
    def get_all_estudiantes(cls):
        try:
            connection = get_connection()
            estudiantes = []

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ESTUDIANTES")
                result = cursor.fetchall()
                for row in result:
                    estudiante = Estudiante(row[0], row[1], row[2], row[3], row[4])
                    estudiantes.append(estudiante.to_JSON())
            connection.close()
            return estudiantes
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_estudiante(cls, id):
        try:
            connection = get_connection()
            print(id)
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ESTUDIANTES WHERE id = %s", (id,))
                row = cursor.fetchone()
                estudiante = None
                if row is not None:
                    estudiante = Estudiante(row[0], row[1], row[2], row[3], row[4])
                    estudiante = estudiante.to_JSON()
            connection.close()
            return estudiante
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_estudiante(cls, estudiante):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO ESTUDIANTES (id, nombres, apellidos, fecha_nac,
                               edad) VALUES (%s, %s, %s, %s, %s)""",
                               (estudiante.id, estudiante.nombres, estudiante.apellidos, estudiante.fecha_nac, estudiante.edad))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_estudiante(cls, id):
        try:
            conection = get_connection()
            with conection.cursor() as cursor:
                cursor.execute("DELETE FROM ESTUDIANTES WHERE id = %s", (id,))
                affected_rows = cursor.rowcount
                conection.commit()
            conection.close()
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_estudiante(cls, estudiante):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""UPDATE ESTUDIANTES SET nombres = %s, apellidos = %s,
                  fecha_nac = %s, edad = %s WHERE id = %s""", (estudiante.nombres, estudiante.apellidos, estudiante.fecha_nac,
                                                              estudiante.edad, estudiante.id))
                affected_rows = cursor.rowcount
                connection.cursor().commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
