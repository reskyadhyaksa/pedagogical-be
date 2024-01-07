import express from "express";
import morgan from "morgan";
import cors from 'cors';
import {config} from 'dotenv';
import router from "./router/route.js";

// Import connection file
import connect from "./database/conn.js";

const app = express()

// app middlewares
app.use(cors({
    origin: 'https://mathped.vercel.app', // Sesuaikan dengan domain klien Anda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Izinkan pengiriman kredensial (contoh: cookies)
  }));
app.use(morgan('tiny')); 
app.use(express.json());
config();

// application port
const port = process.env.PORT || 8080;

// routes
app.use('/api', router)


app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

// start server only when we have valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server")
    }
}).catch(error => {
    console.log("Invalid Database Connection")
})

module.exports = app;