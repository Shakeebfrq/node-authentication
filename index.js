const express = require('express');
const mongoose = require('mongoose')
const router = require('./routes/routes')

const app = express();

DB = 'mongodb+srv://shakib:725943@cluster0.3hhgtdc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB)
.then(()=>{
    console.log('connected to Database')
}).catch((err)=>{
    console.log(`${err.message}`)
})

app.use(express.json());


app.use('/api/users' , router);

PORT = 3000;


app.listen(PORT,()=>{
    console.log('server started sucessfully')
})