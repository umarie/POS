const Product = require('../models/Product');

// Create a new product and save it to the database
const addProduct = async (req, res) => {
  try {
    const { name, category, subcategory,  image, price } = req.body;
    const product = new Product({
      name,
      category,
      subcategory,
      image,
      price,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


async function getProducts(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



async function editProduct(req, res) {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updateFields, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}



  module.exports = {
    addProduct,
    getProducts,
    editProduct,
    deleteProduct
  };