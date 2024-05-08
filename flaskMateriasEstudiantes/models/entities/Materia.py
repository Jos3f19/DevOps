class Materia:
    def __init__(self, cod_Materia, nombre):
        self.cod_Materia = cod_Materia,
        self.nombre = nombre

    def toJSON(self):
        return {
            'cod_Materia': self.cod_Materia,
            'nombre': self.nombre
        }