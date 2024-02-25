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

    const newProduct = await collection.insertOne({
        "title": "HP 15-fc0174ng, Notebook ",
        "price": 499,
        "description": "Mit einem AMD Ryzen 7 7730U Achtkern-Prozessor, 16 Gigabyte DDR4-Arbeitsspeicher und einer schnellen, 512 Gigabyte großen M.2 PCIe NVMe-SSD ist flotte",
        "category": "business",
        "image": "https://www.alternate.de/p/600x600/6/0/HP_15_fc0174ng__Notebook@@1903906.jpg"
      })
    

    res.status(201).json({product,_id:newProduct.insertedId});
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