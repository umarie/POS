const express = require('express');
const router = express.Router();
const storeController = require('../controllers/Store_Controller');

// router.get('/stores', storeController.getAllStores);
// router.get('/stores/:id', storeController.getStoreById);
router.post('/', storeController.addStore);
router.put('/:storeId', storeController.editStore);
router.delete('/:storeId', storeController.removeStore);
// router.put('/stores/:id', storeController.updateStoreById);
// router.delete('/stores/:id', storeController.deleteStoreById);

module.exports = router;
