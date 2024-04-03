// from https://www.youtube.com/watch?v=Q3ixb1w-QaY 

const express = require('express');
const mysql = require ('mysql')
const cors = require ('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'store_database'
})

app.get('/', (re,res)=> {
    return res.json("From backend side!!")
})


app.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// Endpoint to insert into products table
app.post('/insert', (req, res) => {
    const { product_name, product_id, stock, supplier_id } = req.body;
    const sql = "INSERT INTO products (product_name, product_id, stock, supplier_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [product_name, product_id, stock, supplier_id], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Product inserted successfully", productId: result.insertId });
    });
});

app.listen(8071, ()=>{
    console.log("working")
})