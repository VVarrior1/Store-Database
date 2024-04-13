// Importing required modules
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Creating an Express application
const app = express();

// Using CORS middleware to allow cross-origin requests
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Creating a connection to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store_database",
});

// Connect to MySQL and handle any errors
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Route for the root URL
app.get("/", (req, res) => {
  res.json("From backend side!!");
});

// Route to fetch all products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

// Route to fetch all transactions
app.get("/transactions", (req, res) => {
  const sql = "SELECT * FROM transactions";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

// Route to insert a new product in
app.post("/insertProduct", (req, res) => {
  const { product_name, product_id, stock, supplier_id } = req.body;
  const sql =
    "INSERT INTO products (product_name, product_id, stock, supplier_id) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [product_name, product_id, stock, supplier_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.status(201).json({
        message: "Product inserted successfully",
        productId: result.insertId,
      });
    }
  );
});

// Route that deletees an existing product 
app.delete("/deleteProduct/:productId", (req, res) => {
  const productId = req.params.productId;
  const sql = "DELETE FROM products WHERE product_id = ?";
  db.query(sql, productId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  });
});

// Route to update the stock value of a product
app.put("/updateProduct/:productId", (req, res) => {
  const productId = req.params.productId;
  const { newStock } = req.body;

  // Update query to update the stock value of the product
  const sql = "UPDATE products SET stock = ? WHERE product_id = ?";
  
  db.query(sql, [newStock, productId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product stock updated successfully" });
  });
});


// Route to insert a new transaction
app.post("/insertTransaction", (req, res) => {
  const { customer_id, customer_name, purchase_amount, product_id } = req.body;

  // Check if the product_id exists in the products table
  const checkProductQuery = "SELECT * FROM products WHERE product_id = ?";
  db.query(checkProductQuery, product_id, (err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    
    if (products.length === 0) {
      return res.status(400).json({ message: "Product does not exist" });
    }

    const product = products[0];
    const currentStock = product.stock;

    // Check if there is enough stock to perform the transaction
    if (currentStock < purchase_amount) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Update the stock amount in the Products table
    const updatedStock = currentStock - purchase_amount;
    const updateStockQuery = "UPDATE products SET stock = ? WHERE product_id = ?";
    db.query(updateStockQuery, [updatedStock, product_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Insert the transaction
      const insertQuery = "INSERT INTO transactions (customer_id, customer_name, purchase_amount, product_id) VALUES (?, ?, ?, ?)";
      db.query(insertQuery, [customer_id, customer_name, purchase_amount, product_id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        res.status(201).json({ message: "Transaction inserted successfully" });
      });
    });
  });
});

// Start the server
app.listen(8071, () => {
  console.log("Server is working on port 8071");
});
