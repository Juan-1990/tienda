const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nombre: String,
    correo: { type: String, unique: true},
    telefono: String,
    password: String,
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)