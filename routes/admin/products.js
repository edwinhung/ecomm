const express = require("express");
const productsRepo = require("../../repositories/products");
const router = express.Router();
const productsNewTempalte = require("../../views/admin/products/new");

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTempalte({}));
});

module.exports = router;
