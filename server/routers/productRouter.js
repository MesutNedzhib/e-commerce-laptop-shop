import expressAsyncHandler from "express-async-handler";
import express from "express";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/search/:name",
  expressAsyncHandler(async (req, res) => {
    const allProducts = await Product.find({});
    let products = allProducts.filter(
      (item) =>
        item.name
          .toLocaleLowerCase()
          .indexOf(req.params.name.toLocaleLowerCase()) !== -1
    );
    if (products.length !== 0) {
      res.send(products);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/filter",
  expressAsyncHandler(async (req, res) => {
    const model = req.body.model;

    if (model) {
      let products = await Product.find(model);
      if (products.length !== 0) {
        res.send(products);
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    }
  })
);

productRouter.get(
  "/processor-model/:processorModel",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      processorModel: req.params.processorModel,
    });
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
