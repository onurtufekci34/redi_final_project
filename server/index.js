require("dotenv").config();
const express = require("express");
const {connectToMongoDB} = require("./database")


const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

const router = require("./routes");
app.use("/api",router)

const port = process.env.PORT || 3000;
async function startServer(){
    await connectToMongoDB();
    app.listen(port,()=>{
        console.log(`Server is listening on http://localhost:${port}`)
    });
}

startServer();
