class Estudiante:
    def __init__(self, id, nombres, apellidos, fecha_nac, edad):
        self.id = id
        self.nombres = nombres
        self.apellidos = apellidos
        self.fecha_nac = fecha_nac
        self.edad = edad

    def to_JSON(self):
        return {
            'id': self.id,
            'nombres': self.nombres,
            'apellidos': self.apellidos,
            'fecha_nac': self.fecha_nac,
            'edad': self.edad
        }