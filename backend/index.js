const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./Routes/Customer_Route");
const storeRoutes = require("./Routes/Store_Route");

const roleRoutes = require("./Routes/Role_Route");
const productRoutes = require("./Routes/Product_Route");
const mongoose = require("mongoose");
const multer= require("multer")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

// Create a Multer instance with the storage configuration
const upload = multer({ storage: storage });

// Define a route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // The uploaded file can be accessed via the `req.file` object
  res.json({ message: 'File uploaded successfully' });
});

app.use("/api/customers", customerRoutes);
// app.use("/api/suppliers",supplierRoutes );
app.use("/api/products", productRoutes);
app.use("/api/roles",roleRoutes );
app.use("/api/stores",storeRoutes );





mongoose
  .connect(
    "mongodb://localhost:27017/web"

  )
  .then(() => {
    app.listen(5000);
    console.log("Connected! Running on port 5000")
  })
  .catch((err) => {
    console.log(err);
  });