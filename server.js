// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pkg from "body-parser";
import router from "./routes/routes.js";

const { json, urlencoded } = pkg

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority'
}).then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
});
