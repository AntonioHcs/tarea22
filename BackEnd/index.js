const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

let estudiantes = [
    { id: 1, nombre: 'Juan', edad: 20 },
    { id: 2, nombre: 'Ana', edad: 22 },
    { id: 3, nombre: 'Pedro', edad: 19 }
];

app.get('/', (req, res) => {
    console.log("Todo en orden");
});

app.get('/estudiantes', (req, res) => {
    res.json(estudiantes);
});

app.get('/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (estudiante) {
        res.json(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
});

app.post('/estudiantes', (req, res) => {
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad
    };
    estudiantes.push(nuevoEstudiante);
    res.status(201).send(nuevoEstudiante);
});

app.put('/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (estudiante) {
        estudiante.nombre = req.body.nombre;
        estudiante.edad = req.body.edad;
        res.send(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
});

app.delete('/estudiantes/:id', (req, res) => {
    estudiantes = estudiantes.filter(e => e.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});