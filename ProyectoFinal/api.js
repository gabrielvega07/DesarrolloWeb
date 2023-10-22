var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var User  = require("./models/GestionUsers.js");
//importar el validador de express-validator
const { check, validationResult } = require("express-validator");
const cors = require('cors');
router.use(cors());


const mysql = require('mysql2');

// Configura la conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Luna123#',
    database: 'usersmysql',
    waitForConnections: true,
    connectionLimit: 40, // Puedes ajustar esta cantidad según tus necesidades
    queueLimit: 0
});

// Asegúrate de que `pool` esté disponible en tu módulo de rutas
module.exports = pool;


const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Luna123#',
  database: 'usersmysql',
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


//conecta a la base de datos
const uri = "mongodb://127.0.0.1:27017/usuariosDB";

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

// si quiero llamar a generador de carros
//var genera = require("./genera.js");
//console.log(genera());


//es un ejemplo, hacer las llamadas por cada verbo
// http://localhost:3000/api/test



module.exports = router;

router.get("/users", async (req, res) => {
    try {
        const users = await User.find(); // Utiliza await para esperar a que se complete la consulta
        res.status(200).json(users); // Devuelve los usuarios como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los usuarios");
    }
});

router.post(
    '/login',
    [
      check('email', 'El correo electrónico es obligatorio').isEmail(),
      check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ],
    async (req, res) => {
      // Verifica si hay errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // Busca el usuario en la base de datos por su correo electrónico
        const user = await User.findOne({ email });
  
        if (!user) {
          return res.status(400).json({ message: 'Credenciales inválidas' });
        }
  
        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).json({ message: 'Credenciales inválidas' });
        }
  
        // Genera un token JWT para el usuario autenticado
        const payload = {
          user: {
            id: user.id, // Puedes incluir otros datos del usuario aquí
          },
        };
  
        // Aquí, debes configurar una clave secreta adecuada para JWT (puede ser una variable de entorno)
        const jwtSecret = 'tu_secreto_jwt';
        
        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
      }
    }
  );
  
  module.exports = router;

router.get("/userssql", async (req, res) => {
    try {
        
        // Realiza una consulta SQL para seleccionar usuarios de MySQL
        const sql = 'SELECT * FROM perfiles'; // Ajusta la consulta según tus necesidades
        mysqlConnection.query(sql, (error, results, fields) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Error al obtener los usuarios de MySQL");
            }
            // Devuelve los resultados de la consulta en formato JSON
            res.status(200).json(results);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los usuarios");
    }
});



router.post("/users", [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('role', 'El rol es obligatorio').not().isEmpty(),
], async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = new User(req.body);

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        const profileData = {
            user_id: newUser._id,
            full_name: req.body.username,
            date_of_birth: req.body.date_of_birth,
            profile_picture: req.body.profile_picture
        };

        const sql = 'INSERT INTO perfiles SET ?';
        mysqlConnection.query(sql, profileData, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
        });

        
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al guardar el usuario");
    }
});



// Método PUT para actualizar un usuario y su perfil con validaciones
router.put("/users/:id", [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
], async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.params.id;

        const { username, email, role } = req.body;

        // Actualiza los datos del usuario en MongoDB
        await User.findByIdAndUpdate(userId, { username, email, role });

        // Actualiza los datos del perfil en MySQL
        const { full_name, date_of_birth, profile_picture } = req.body;
        const updateProfileSql = "UPDATE perfiles SET full_name = ?, date_of_birth = ?, profile_picture = ? WHERE user_id = ?";
        mysqlConnection.query(updateProfileSql, [full_name, date_of_birth, profile_picture, userId], (error, results) => {
            if (error) {
                return console.error(error.message);
            }
            console.log('Rows affected for profile:', results.affectedRows);

            res.status(200).json({ message: 'Usuario y perfil actualizados correctamente' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el usuario y perfil");
    }
});


// Método DELETE para eliminar un usuario
router.delete("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndRemove(userId);

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Aquí, también elimina el perfil del usuario en MySQL por su ID
        const sql = 'DELETE FROM perfiles WHERE user_id = ?';
        mysqlConnection.query(sql, [userId], (error, results) => {
            if (error) {
                console.error(error.message);
                return res.status(500).send("Error al eliminar el perfil del usuario en MySQL");
            }
            console.log('Perfil del usuario eliminado en MySQL');
        });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el usuario");
    }
});



module.exports = router;
