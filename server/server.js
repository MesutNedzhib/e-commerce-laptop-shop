import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import connectDatabase from "./helpers/database/connectDatabase.js";
import productRouter from "./routers/productRouter.js";
import orderRauter from "./routers/orderRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enviroment Variables
dotenv.config({
  path: "./config/env/config.env",
});

// MongoDB Connection
connectDatabase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT} : 'http://localhost:${PORT}'`);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRauter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
