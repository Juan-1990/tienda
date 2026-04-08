const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

//Middlewares
app.use(cors())
app.use(express.json())

//ruta de prueba
app.get("/", (req, res) => {
    res.send("API funcionando")
})

// coneccion con mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err))

// puerto
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
