import express from "express";
import { router } from "./routes/main.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/v1", router);

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Mongo Connected : {${process.env.MONGO_URL}}`);
    })
    .catch((err) => {
      console.log(`Mongo Connection Error : ${err}`);
    });

  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
};

main();