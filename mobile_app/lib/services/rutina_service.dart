import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/rutina.dart';

class RutinaService {
  Future<List<Rutina>> obtenerRutinas() async {
    final response = await http.get(Uri.parse('${ApiConfig.baseUrl}/rutinas'));

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Rutina.fromJson(json)).toList();
    } else {
      throw Exception('Error al cargar rutinas');
    }
  }
}
