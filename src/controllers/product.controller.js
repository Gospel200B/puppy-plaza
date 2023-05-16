const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("invalid category or category not found");
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    images: req.body.images,
    price: req.body.price,
    size: req.body.size,
    height: req.body.height,
    countInStock: req.body.countInStock,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    return res.status(400).send("The product can not be created.");
  }
  res.status(200).send(product);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(400).send("The product can not be fetched");
  }
  res.status(200).send(product);
};

const getProductList = async (req, res) => {

  let filter ={}
  if(req.query.category){
    filter = {category: req.query.category.split(',')}
  }
  const productList = await Product.find(filter).select(
    "name price description image"
  ).populate('category');

  if (productList) {
    return res.status(200).send(productList);
  } else {
    res.status(400).send("ProductList can not be fetched");
  }
};

const updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("invalid product id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("invalid category or category not found");
  }

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      images: req.body.images,
      price: req.body.price,
      size: req.body.size,
      height: req.body.height,
      countInStock: req.body.countInStock,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (updateProduct) {
    return res.status(200).send(updateProduct);
  }
  res.status.send(err);
};

const deleteProduct = async (req, res) => {
  const deleteProduct = await Product.findByIdAndRemove(req.params.id, {
    new: true,
  });
  if (deleteProduct) {
    return res.status(200).send("deleted successfully");
  } else {
    res.status(404).send("Failed to delete product");
  }
};

const productCount = async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    return res.status(500).json({success: false});
  }
  res.status(200).send({productCount : productCount});
};

const products = async (req, res) => {
  const count =  req.params.count ? req.params.count : 0
    const product = await Product.find({isFeatured :true}).limit(+count);
    if (!products) {
      return res.status(500).json({success: false});
    }
    res.status(200).send({productCount : productCount});
  };

module.exports = {
  createProduct,
  getProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  productCount,
  products
};
