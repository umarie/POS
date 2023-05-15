const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');

// Route for adding a new customer
router.post('/', customerController.addCustomer);

// Route for getting all customers
// router.get('/customers', customerController.getAllCustomers);

// // Route for getting a single customer by ID
// router.get('/customers/:id', customerController.getCustomerById);

// // Route for updating a customer by ID
// router.put('/customers/:id', customerController.updateCustomer);

// // Route for deleting a customer by ID
// router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
