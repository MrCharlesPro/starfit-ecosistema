class Rutina {
  final int id;
  final String nombre;
  final int duracionMin;
  final int caloriasEstimadas;
  final String nivel;
  final String video;
  final String imagen;

  Rutina({
    required this.id,
    required this.nombre,
    required this.duracionMin,
    required this.caloriasEstimadas,
    required this.nivel,
    required this.video,
    required this.imagen,
  });

  factory Rutina.fromJson(Map<String, dynamic> json) {
    return Rutina(
      id: json['id'],
      nombre: json['nombre'],
      duracionMin: json['duracionMin'],
      caloriasEstimadas: json['caloriasEstimadas'],
      nivel: json['nivel'],
      video: json['video'],
      imagen: json['imagen'],
    );
  }
}
