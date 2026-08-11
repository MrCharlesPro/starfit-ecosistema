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
      debugShowCheckedModeBanner: false,
      theme: ThemeData(brightness: Brightness.dark),
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
    setState(() => _activo = !_activo);

    if (_activo) {
      _timer = Timer.periodic(const Duration(seconds: 2), (_) {
        setState(() {
          _pasos += _random.nextInt(15) + 5;
          _bpm = 90 + _random.nextInt(40);
          _calorias = (_pasos * 0.04).round();
        });
        _service.enviarActividad(pasos: _pasos, bpm: _bpm, caloriasQuemadas: _calorias);
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
      backgroundColor: const Color(0xFF111111),
      body: Center(
        child: Container(
          width: 340,
          height: 340,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.black,
            border: Border.all(color: const Color(0xFF2A2A2A), width: 10),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.6), blurRadius: 20, spreadRadius: 4),
            ],
          ),
          child: ClipOval(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('StarFit', style: TextStyle(color: Colors.orange, fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text('$_bpm', style: const TextStyle(color: Colors.redAccent, fontSize: 40, fontWeight: FontWeight.bold)),
                  const Text('BPM', style: TextStyle(color: Colors.white38, fontSize: 10)),
                  const SizedBox(height: 10),
                  Text('$_pasos pasos', style: const TextStyle(color: Colors.white, fontSize: 14)),
                  Text('$_calorias kcal', style: const TextStyle(color: Colors.white54, fontSize: 12)),
                  const SizedBox(height: 14),
                  GestureDetector(
                    onTap: _toggleActividad,
                    child: Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: _activo ? Colors.red : Colors.green,
                      ),
                      child: Icon(_activo ? Icons.stop : Icons.play_arrow, color: Colors.white, size: 22),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
