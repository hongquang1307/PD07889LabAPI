const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

//Users sé tạo ra collẻtion (table) tương ứng
const Fruit = new Scheme({
        name: {type:String},
        quantity: {type:Number},
        price: {type:Number},
        status: {type:Number},
        images: {type:Array},
        description: {type:String},
        id_description: {type:Scheme.Types.ObjectId, ref:'distrubutor'},   
},{
    timestamps:true
})

module.exports = mongoose.model('fruit',Fruit)