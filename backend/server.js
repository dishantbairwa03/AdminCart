import express from "express";
import dotenv from "dotenv";
// import path from 'path';
import { connectDB } from "./config/db.js";
import productsRouter from './routes/products.route.js';

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;
// const __dirname = path.resolve();

app.use(express.json()); // allows us to accept json data in the req.body
app.use('/api/products', productsRouter);

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/build")))
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "static", "js", "main.f451379c.js"))
//     })
// }

app.listen(Port, () => {
    connectDB();
    console.log(`Server is running at port: http://localhost:${Port}`)
})
