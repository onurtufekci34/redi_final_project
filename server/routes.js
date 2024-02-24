const express = require("express");

const router = express.Router();


//Get /products
router.get("/products",(req,res)=>{
    res.status(200).json({mssg:"Get resquest to /api/products"});
})

// Post /products
router.post("/products",(req,res)=>{
    res.status(201).json({mssg:"Post resquest to /api/products"});
})

//Delete /products/:id
router.delete("/products/:id",(req,res)=>{
    res.status(200).json({mssg:"Delete resquest to /api/products/:id"});
})

// Put /products/:id
router.put("/products/:id",(req,res)=>{
    res.status(200).json({mssg:"Put resquest to /api/products/:id"});
})



module.exports = router;