const mongoose = require('mongoose');
const Scheme = mongoose.Schema;


const Distrubutor = new Scheme({
     name:  {type:String, }
   
},{
    timestamps:true
})

module.exports = mongoose.model('distrubutor',Distrubutor)