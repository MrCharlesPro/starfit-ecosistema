import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'services/actividad_service.dart';

void main() {
  runApp(const WearableApp());
}

class WearableApp extends StatelessWidget {
  const WearableApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StarFit Wearable',
      theme: ThemeData(
        primarySwatch: Colors.deepOrange,
        brightness: Brightness.dark,
      ),
      home: const WearableScreen(),
    );
  }
}

class WearableScreen extends StatefulWidget {
  const WearableScreen({super.key});

  @override
  State<WearableScreen> createState() => _WearableScreenState();
}

class _WearableScreenState extends State<WearableScreen> {
  final ActividadService _service = ActividadService();
  final Random _random = Random();

  bool _activo = false;
  int _pasos = 0;
  int _bpm = 70;
  int _calorias = 0;
  Timer? _timer;

  void _toggleActividad() {
    setState(() {
      _activo = !_activo;
    });

    if (_activo) {
      _timer = Timer.periodic(const Duration(seconds: 2), (_) {
        setState(() {
          _pasos += _random.nextInt(15) + 5;
          _bpm = 90 + _random.nextInt(40);
          _calorias = (_pasos * 0.04).round();
        });
        _service.enviarActividad(
          pasos: _pasos,
          bpm: _bpm,
          caloriasQuemadas: _calorias,
        );
      });
    } else {
      _timer?.cancel();
      _bpm = 70;
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('StarFit', style: TextStyle(color: Colors.orange, fontSize: 20)),
            const SizedBox(height: 20),
            Text('$_bpm', style: const TextStyle(color: Colors.redAccent, fontSize: 48, fontWeight: FontWeight.bold)),
            const Text('BPM', style: TextStyle(color: Colors.white54)),
            const SizedBox(height: 20),
            Text('$_pasos pasos', style: const TextStyle(color: Colors.white, fontSize: 18)),
            Text('$_calorias kcal', style: const TextStyle(color: Colors.white70)),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: _toggleActividad,
              style: ElevatedButton.styleFrom(
                backgroundColor: _activo ? Colors.red : Colors.green,
                shape: const CircleBorder(),
                padding: const EdgeInsets.all(24),
              ),
              child: Icon(_activo ? Icons.stop : Icons.play_arrow, size: 32),
            ),
            const SizedBox(height: 12),
            Text(_activo ? 'Detener actividad' : 'Iniciar actividad', style: const TextStyle(color: Colors.white54)),
          ],
        ),
      ),
    );
  }
}
