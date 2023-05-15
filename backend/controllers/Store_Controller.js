const Store = require("../models/Store");

const addStore = async (req, res) => {
  try {
    const { name, address, city } = req.body;

    const newStore = new Store({
      name,
      address,
      city,
    });

    const savedStore = await newStore.save();

    res.status(201).json(savedStore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





const editStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    console.log({storeId});
    const { name, address, city } = req.body;

    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      { name, address, city },
      { new: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};







const removeStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const deletedStore = await Store.findByIdAndRemove(storeId);

    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addStore,
  editStore,
  removeStore
};











