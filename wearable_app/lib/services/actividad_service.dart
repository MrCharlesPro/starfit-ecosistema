import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';

class ActividadService {
  Future<void> enviarActividad({
    required int pasos,
    required int bpm,
    required int caloriasQuemadas,
  }) async {
    await http.post(
      Uri.parse('${ApiConfig.baseUrl}/actividad'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'pasos': pasos,
        'bpm': bpm,
        'caloriasQuemadas': caloriasQuemadas,
      }),
    );
  }
}
