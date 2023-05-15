const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

// Create a new product
router.post('/add', productController.addProduct);

// Get all products
router.get('/get', productController.getProducts);

// Get a specific product by ID
// router.get('/products/:id', productController.getProductById);

// Edit a specific product by ID
router.put('/update/:id', productController.editProduct);

// Delete a specific product by ID
router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;