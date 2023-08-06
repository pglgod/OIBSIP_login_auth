

const mongoose = require("mongoose");
const { Schema } = mongoose;



const UserSchema = new Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique  :true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    cource:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    enrollment:{
        type: String,
        unique: true,
        require: true
    },
    profileImg:{
        type: String,
        require: true
    }

});

const User = mongoose.model("User", UserSchema);
module.exports = User