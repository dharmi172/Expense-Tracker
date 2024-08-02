const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path:"./config.env"});
const port = process.env.PORT || 5000;

//use midleware
app.use(cors());
app.use(express.json());

//mongodb connection
const con = require('./db/connection.js')

//use routes
app.use(require('./routes/route'));

con.then(db=>{
    if(!db)return process.exit(1);

    //listen http server
    app.listen(port, () =>{
        console.log(`server is running on port http://localhost:${port}`)
    })

    app.on('error',err=>console.log("Failed to connect HTTP server:${err}"));
    //error in db connection
}).catch(error=>{
    console.log("Connection failed");
})




