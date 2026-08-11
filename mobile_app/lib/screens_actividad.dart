import 'dart:async';
import 'package:flutter/material.dart';
import 'services/actividad_service.dart';

class ActividadScreen extends StatefulWidget {
  const ActividadScreen({super.key});

  @override
  State<ActividadScreen> createState() => _ActividadScreenState();
}

class _ActividadScreenState extends State<ActividadScreen> {
  final ActividadService _service = ActividadService();
  Actividad? _actividad;
  Timer? _poller;

  @override
  void initState() {
    super.initState();
    _cargar();
    _poller = Timer.periodic(const Duration(seconds: 2), (_) => _cargar());
  }

  Future<void> _cargar() async {
    try {
      final a = await _service.obtenerActividad();
      if (mounted) setState(() => _actividad = a);
    } catch (_) {}
  }

  @override
  void dispose() {
    _poller?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final a = _actividad;
    return Scaffold(
      appBar: AppBar(title: const Text('Actividad — Wearable')),
      body: a == null
          ? const Center(child: CircularProgressIndicator())
          : Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('${a.bpm}', style: const TextStyle(fontSize: 56, color: Colors.red, fontWeight: FontWeight.bold)),
                  const Text('BPM'),
                  const SizedBox(height: 24),
                  Text('${a.pasos} pasos', style: const TextStyle(fontSize: 22)),
                  Text('${a.caloriasQuemadas} kcal quemadas'),
                ],
              ),
            ),
    );
  }
}
