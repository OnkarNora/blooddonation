const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    blood:String,
    pincode:mongoose.Schema.Types.Number,
    loc:mongoose.Schema.Types.Array,

})

module.exports = mongoose.model('donors',userSchema);