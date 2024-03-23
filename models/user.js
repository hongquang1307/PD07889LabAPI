const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//Users sé tạo ra collẻtion (table) tương ứng
const Users = new Scheme({
    usersname: {type:String, unique:true,maxLength: 225},
    password : { type: String,maxLength:255},
    // email:{type:String,unique:true}, trong thực tế là dùng
    email:{type:String},
    name: {type:String},
    avatar: {type:String},
    age :{type : Number,min:18, max:65},
    available:{type:Boolean,default:false},
},{
    timestamps:true
})

module.exports = mongoose.model('users',Users)