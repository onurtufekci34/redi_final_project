const express = require("express");

const router = express.Router();


//Get /products
router.get("/products",(req,res)=>{
    res.status(200).json({mssg:"Get resquest to /api/products"});
})

// Post /products


//Delete /products/:id

// Put /products/:id