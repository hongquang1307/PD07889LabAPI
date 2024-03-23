var exports = require('express');
var router = express.Router();


//thêm model
const Distributors= require('../models/distributors')
const Fruits = require('../models/fruits')
router.post('/add-distributor',async(req,res)=>{
    try{
        const data = req.body ;
        const newDistributor = new Distributors({
            name:data.name
        });
        const result = await newDistributor.save();
        if(result)
        {
            res.json({
                "status" : 200,
                "messenger" :"Thêm thanh công",
                "data": result
            })
        } else{
            res.json({
                "status":400,
                "messenger":"Lỗi ,Thêm thất baị",
                "data": []
            })
        }
    } catch(error){
        console.log(error)
    }
});
module.exports = router;