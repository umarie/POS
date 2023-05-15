const express = require('express');
const router = express.Router();

const roleController = require('../controllers/Role_Controller');

// Route to add a new role
router.post('/add', roleController.addRole);
router.put('/edit/:roleId', roleController.editUserInfo);
router.delete('/edit/:roleId', roleController.removeUser);



// Route to get all roles
router.get('/get', roleController.getUsers); 

module.exports = router;
