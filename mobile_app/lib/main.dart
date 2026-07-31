import 'package:flutter/material.dart';
import 'services/rutina_service.dart';
import 'models/rutina.dart';

void main() {
  runApp(const StarFitApp());
}

class StarFitApp extends StatelessWidget {
  const StarFitApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StarFit',
      theme: ThemeData(primarySwatch: Colors.deepOrange),
      home: const RutinasScreen(),
    );
  }
}

class RutinasScreen extends StatefulWidget {
  const RutinasScreen({super.key});

  @override
  State<RutinasScreen> createState() => _RutinasScreenState();
}

class _RutinasScreenState extends State<RutinasScreen> {
  final RutinaService _service = RutinaService();
  late Future<List<Rutina>> _rutinasFuture;

  @override
  void initState() {
    super.initState();
    _rutinasFuture = _service.obtenerRutinas();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('StarFit — Rutinas')),
      body: FutureBuilder<List<Rutina>>(
        future: _rutinasFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          final rutinas = snapshot.data!;
          return ListView.builder(
            itemCount: rutinas.length,
            itemBuilder: (context, index) {
              final r = rutinas[index];
              return ListTile(
                title: Text(r.nombre),
                subtitle: Text('${r.duracionMin} min · ${r.caloriasEstimadas} kcal · ${r.nivel}'),
              );
            },
          );
        },
      ),
    );
  }
}
