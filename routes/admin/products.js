const express = require("express");
const multer = require("multer");

const { handleErrors } = require("./middlewares");
const { requireTitle, requirePrice } = require("./validators");
const productsRepo = require("../../repositories/products");
const productsNewTempalte = require("../../views/admin/products/new");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTempalte({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTempalte),
  async (req, res) => {
    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");
    await productsRepo.create({ title, price, image });

    res.send("submitted");
  }
);

module.exports = router;
