const express = require("express");
const router = express.Router();
const {getConnectedClient} = require("./database")
const {ObjectId} = require ("mongodb")

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("productsdb").collection("products");
    return collection;
}

//Get /products
router.get("/products",async (req,res)=>{
    const collection =getCollection();
    const products = await collection.find({}).toArray();

    res.status(200).json(products);
})

// Post /products
router.post("/products",async (req,res)=>{
    const collection =getCollection();
    const {product} = req.body;

    const newProduct = await collection.insertOne({product, status: false})
    

    res.status(201).json({product, status:false, _id:newProduct.insertedId});
})

//Delete /products/:id
router.delete("/products/:id",async (req,res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deletedProduct = await collection.deleteOne({_id});


    res.status(200).json(deletedProduct);
})

// Put /products/:id
router.put("/products/:id",async (req,res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const updatedProduct = await collection.updateOne({_id},{$set: {status:!status}})


    res.status(200).json(updatedProduct);
})



module.exports = router;