const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    blood:String,
    pincode:String
})

module.exports = mongoose.model('donors',userSchema);