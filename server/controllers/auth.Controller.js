const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Registro
exports.register = async (req, res) => {
    try {
        const {nombre, correo, telefono, password } = req.body

        const user = new User({
            nombre,
            correo,
            telefono,
            password: hashedPassword
        })

        await user.save()

        res.json({message: "Usuario registrado correctamente"})

    } catch(error) {
        res.status(500).json({ error: error.message})
    }
}

// LOGIN
exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};