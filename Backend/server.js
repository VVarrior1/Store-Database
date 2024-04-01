// from https://www.youtube.com/watch?v=Q3ixb1w-QaY 

const express = require('express');
const mysql = require ('mysql')
const cors = require ('cors')

const app = express()
app.use(cors())

app.get('/', (re,res)=> {
    return res.json("From backend side!!")
})

app.listen(8071, ()=>{
    console.log("working")
})