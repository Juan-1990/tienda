const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const authRoutes = require("./routes/authRoutes");

const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes);

//ruta de prueba
app.get("/", (req, res) => {
    res.send("API funcionando")
})

// coneccion con mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err))

// puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
