var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var LibroSchema = require("./models/librosschema.js");
// Importar el validador de express-validator
const { check, validationResult } = require("express-validator");
const cors = require('cors');
router.use(cors());
// Conéctate a la base de datos de MongoDB Atlas
const uri = "mongodb://localhost:27017";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error(err);
  });

  
// http://localhost:3000/api/test
router.post('/test', function (req, res) {
    res.status(201).send('Insertado!');
});

router.put("/test", function (req, res) {
  res.status(200).send("Actualizado!");
});

router.get("/test", function (req, res) {
  res.status(200).send("Obtenido!");
});


router.delete("/test", function (req, res) {
  res.status(200).send("Eliminado!");
});

router.get("/libros", async (req, res) => {
    try {
        const libros = await LibroSchema.find(); // Utiliza await para esperar a que se complete la consulta
        res.status(200).send(libros);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los libros");
    }
});

router.get("/libros/:id", async (req, res) => {
    try {
        const libro = await LibroSchema.findById(req.params.id); // Utiliza await para esperar a que se complete la consulta
        if (!libro) {
            res.status(404).send("Libro no encontrado");
        } else {
            res.status(200).json(libro);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener el libro");
    }
});

router.post("/libros", async (req, res) => {
    try {
        const libro = new LibroSchema(req.body);
        await libro.save();
        res.status(200).json(libro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al guardar el libro");
    }
});

router.put("/libros/:id", async (req, res) => {
    try {
        const libro = await LibroSchema.findById(req.params.id).exec();
        if (!libro) {
            return res.status(404).send("Libro no encontrado");
        }

        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.añoPublicacion = req.body.añoPublicacion;
        libro.isbn = req.body.isbn;
        libro.genero = req.body.genero;

        await libro.save();

        res.status(200).json(libro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el libro");
    }
});


router.delete("/libros/:id", async (req, res) => {
    try {
        const libro = await LibroSchema.findByIdAndRemove(req.params.id).exec();
        if (!libro) {
            return res.status(404).send("Libro no encontrado");
        }
        res.status(200).json(libro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el libro");
    }
});

module.exports = router;