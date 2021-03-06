import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import dotenv from "dotenv";
import connectDB from './config/connectDB';
import cors from 'cors';

dotenv.config();

let app = express();

app.use(cors({ origin: true }))

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//Port ==== underfined => port = 6969

app.listen(port, () => {
    //callback
    console.log("backend Nodejs is running on the port: " + port)
});
