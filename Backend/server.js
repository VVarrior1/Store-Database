// REFERENCES ARE IN THE COMMENTS THROUGHOUT THIS JAVASCRIPT FILE 
// AND ALSO THROUGHOUT THE ENTIRE PROJECT FILES. 

// The package.json file above comes from the "init -y" command (followed from https://www.youtube.com/watch?v=Q3ixb1w-QaY&t=624s at 1:11)
// The package-lock.json file and node_modules folder above comes from the "install express mysql cors nodemon" command (followed from https://www.youtube.com/watch?v=Q3ixb1w-QaY&t=624s at 1:42) 


// This starter code below which connects to the MySQL database comes from https://www.youtube.com/watch?v=Q3ixb1w-QaY&t=624s by "Code With Yousaf" 
// The reference to this video starts here ... 

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());


app.use(express.json());

// Creating a connection to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store_database",
});

app.get("/", (req, res) => {
  res.json("From backend side!");
});

// Start the server (listens for port)
app.listen(8071, () => {
  console.log("Server is working on port 8071");
});

// Route to fetch all products (modification of the /users code in the video reference)
app.get("/products", (req, res) => {
  // SQL selecting from products table in db (database).
  const sql = "SELECT * FROM products";
  db.query(sql, (err, data) => {
    // If error return a status message 
    if (err) {
      console.error(err);
      return res.json(err);
    }
    res.json(data);
  });
});

// Route to fetch all transactions (modification of the /users code in the video reference)
app.get("/transactions", (req, res) => {
  const sql = "SELECT * FROM transactions";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }
    res.json(data);
  });
});

// END OF REFERENCE FOR VIDEO 


// Route to insert a new product in 
// Post is used to send data to our server on phpMyAdmin 
app.post("/insertProduct", (req, res) => {
  // Assigning variables to insert
  const { 
    product_name, 
    product_id, 
    stock, 
    supplier_id 
  } = req.body;

  //SQL query to check for product_id's in the products table for duplicates
  const checkSql = "SELECT product_id FROM products WHERE product_id = ?";
  db.query(checkSql, [product_id], (err, result) => {
    if (err) {
      // Give error message if there is one
      console.error(err);
      return res.json({ message: "Error checking product ID" });
    }
    // When checking the length of the result array, if it is more than 0, then...
    if (result.length > 0) {
      // the product_id already exists, so return an error message
      return res.json({ message: "Product ID already exists!" });
    }

    // If no existing product_id is found (we got past all of the conditional checks), then insert the new product
    const sql =
      "INSERT INTO products (product_name, product_id, stock, supplier_id) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [product_name, product_id, stock, supplier_id], // inserting in all of the columns we need 
      (err, result) => {
        // if there is an error return an error message
        if (err) {
          console.error(err);
          return res.json({ message: "Error inserting product" });
        }
        // If no error, give a successfully inserted message 
        res.json({
          message: "Product inserted successfully",

          // productId: result.insertId, (MIGHT NOT NEED)
        });
      }
    );
  });
});

// Route that deletees an existing product
app.delete("/deleteProduct/:productId", (req, res) => {
  // Sets productID from req
  const productId = req.params.productId;
  // SQL delete a product from product_id
  const sql = "DELETE FROM products WHERE product_id = ?";
  db.query(sql, productId, (err) => {
    if (err) {
      // if there is an error return an error message 
      console.error(err);
      return res.json({message: "Error in deleting product"});
    }

    // If no error, gives a success message
    res.json({ message: "Product deleted successfully" });
  });
});

// Route that deletes an existing transaction (Code is the same as the delete for products above)
app.delete("/deleteTransaction/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;
  const sql = "DELETE FROM transactions WHERE transaction_id = ?";
  db.query(sql, transactionId, (err) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }

    res.json({ message: "Transaction deleted successfully" });
  });
});

// Route to update the stock of a product
app.put("/updateProduct/:productId", (req, res) => {
  // Getting the variables from req 
  const productId = req.params.productId;
  const { 
    newStock 
  } = req.body; // This represents the new stock value to use to updates 

  // Update query to update the stock value of the product
  const sql = "UPDATE products SET stock = ? WHERE product_id = ?";

  db.query(sql, [newStock, productId], (err, result) => {
    if (err) {
      // Error message
      console.error(err);
      return res.json(err);
    }

    res.json({ message: "Product stock updated successfully" });
  });
});

// Route to insert a new transaction
app.post("/insertTransaction", (req, res) => {
  const {
    // Assigning variables to insert 
    transaction_id,
    customer_id,
    customer_name,
    purchase_amount,
    product_id,
  } = req.body; 

  // Check to see if the product_id exists in the products table
  const checkProductQuery = "SELECT * FROM products WHERE product_id = ?";
  db.query(checkProductQuery, product_id, (err, products) => {
    if (err) {
      // Error message
      console.error(err);
      return res.json(err);
    }

    // If the products array has a length of zero, then we could find the product_id in the products table
    if (products.length === 0) {
      return res.json({ message: "Product does not exist" });
    }

    const currentStock = products[0].stock;

    // Check if there is enough stock to perform the transaction
    if (currentStock < purchase_amount) {
      return res.json({ message: "Not enough stock available" });
    }

    // Update the stock amount in the Products table once the conditional if-checks are passed
    const updatedStock = currentStock - purchase_amount;
    // While we are inserting a transaction, this updates the products stock with the updatedStock value 
    const updateStockQuery =
      "UPDATE products SET stock = ? WHERE product_id = ?";
    db.query(updateStockQuery, [updatedStock, product_id], (err) => {

      // After, we can insert into the transaction table 
      const insertQuery =
        "INSERT INTO transactions (transaction_id,customer_id, customer_name, purchase_amount, product_id) VALUES (?,?, ?, ?, ?)";
      db.query(
        insertQuery,
        [
          transaction_id,
          customer_id,
          customer_name,
          purchase_amount,
          product_id,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            // Error message
            return res.json({ message: "Error inserting into transactions" });
          }
          // If we have no errors, then a success message 
          res.json({ message: "Transaction inserted successfully" });
        }
      );
    });
  });
});
