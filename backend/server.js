const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json());
const uri = process.env.DB_URI

mongoose.connect(uri)
const connection=mongoose.connection
connection.once('open',()=>{
    console.log("mongoDB connection established")
})

const usersRouter = require('./routes/users')

app.use('/users', usersRouter)
app.get('/', (req,res)=>{
    res.send('welcome to the strive appllication')
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})