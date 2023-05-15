const Customer = require('../models/Customer');

const addCustomer = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const customer = new Customer({
      name,
      contact,
      address,
    });
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getCustomers = async (req, res) => {
    try {
        // Fetch all customers from the database
        const customers = await Customer.find();
    
        res.status(200).json(customers);
      } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };


module.exports = {
    addCustomer,
    getCustomers
  };