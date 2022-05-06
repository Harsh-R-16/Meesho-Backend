const Product = require("../models/productModel");
// const allProducts = require("../AllProducts");

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    const token = req.headers.authorization;
    token && console.log(token.split(" ")[1]);
    res.status(200).json({
      message: "Success!!!",
      information: "Meesho Website Api",
      results: allProducts.length,
      data: allProducts,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error in fetching products",
      message: err,
    });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    allProducts.sort(() => Math.random() - 0.5);
    res.status(200).json({
      message: "Success!!!",
      information: "Meesho Website Api",
      results: 100,
      data: allProducts.slice(0, 100),
    });
  } catch (err) {
    res.status(404).json({
      status: "Error in fetching products",
      message: err,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({
      message: "Success!!!",
      information: "Meesho Website Api",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error in fetching product",
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log(newProduct);
    res
      .status(200)
      .json({ message: "POST request successful!!!", data: newProduct });
  } catch (err) {
    res.status(400).json({
      status: "Error in creating product",
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: "PATCH request successful!!!", data: product });
  } catch (err) {
    res.status(400).json({
      status: "Error in updating product",
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "DELETE request successful!!!", data: product });
  } catch (err) {
    res.status(400).json({
      status: "Error in deleting product",
      message: "You not authorized to delete product!",
    });
  }
};
