from database.db import get_connection
from .entities.Materia import Materia


class MateriaModel:

    @classmethod
    def get_all_materias(cls):
        try:
            connection = get_connection()
            materias = []

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM MATERIAS")
                result = cursor.fetchall()
                for row in result:
                    materia = Materia(row[0], row[1])
                    materias.append(materia.toJSON())
            connection.close()
            return materias
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_materia(cls, cod_Materia):
        try:
            connection = get_connection()
            print(id)
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM MATERIAS WHERE cod_Materia = %s", (cod_Materia,))
                row = cursor.fetchone()
                materia = None
                if row is not None:
                    materia = Materia(row[0], row[1])
                    materia = materia.toJSON()
            connection.close()
            return materia
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_materia(cls, materia):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO MATERIAS (cod_Materia, nombre) VALUES (%s, %s)""",
                               (materia.cod_Materia, materia.nombre))
                affected_rows = cursor.rowcount
                connection.commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_materia(cls, cod_Materia):
        try:
            conection = get_connection()
            with conection.cursor() as cursor:
                cursor.execute("DELETE FROM MATERIAS WHERE cod_Materia = %s", (cod_Materia,))
                affected_rows = cursor.rowcount
                conection.commit()
            conection.close()
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_materia(cls, materia):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""UPDATE MATERIAS SET nombre = %s WHERE cod_Materia = %s""", (materia.nombre, materia.cod_Materia))
                affected_rows = cursor.rowcount
                connection.cursor().commit()
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
