import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';

class Actividad {
  final int pasos;
  final int bpm;
  final int caloriasQuemadas;
  final String? ultimaActualizacion;

  Actividad({required this.pasos, required this.bpm, required this.caloriasQuemadas, this.ultimaActualizacion});

  factory Actividad.fromJson(Map<String, dynamic> json) {
    return Actividad(
      pasos: json['pasos'] ?? 0,
      bpm: json['bpm'] ?? 70,
      caloriasQuemadas: json['caloriasQuemadas'] ?? 0,
      ultimaActualizacion: json['ultimaActualizacion'],
    );
  }
}

class ActividadService {
  Future<Actividad> obtenerActividad() async {
    final response = await http.get(Uri.parse('${ApiConfig.baseUrl}/actividad'));
    if (response.statusCode == 200) {
      return Actividad.fromJson(jsonDecode(response.body));
    }
    throw Exception('Error al cargar actividad');
  }
}
