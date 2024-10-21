const express = require("express")
const mongoose = require("mongoose")
const url = require("./src/routes/url")
const cors = require('cors')


const app = express()

mongoose.connect("mongodb://localhost:27017/URLshortener")
                .then( ()=> console.log("DB connected"))
                .catch( (err)=> console.log(err, "DB not connected"))

app.use(express.json());
app.use(cors());              

app.use("/", url);


app.listen(4000).on("listening", ()=>{
     console.log("listening on 4000")
});




// cors add in backind