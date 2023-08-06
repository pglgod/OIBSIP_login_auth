
const mongoose = require("mongoose");

const mongoURI = `mongodb+srv://korero:568Mkorero@cluster0.w9jb7js.mongodb.net/?retryWrites=true&w=majority`

const conectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("KORERO Connected");
    }).catch(()=>{
        console.error('Error connecting to KORERO');
    })
}


module.exports = conectToMongo;