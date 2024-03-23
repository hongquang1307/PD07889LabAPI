var express = require('express');
var router = express.Router();
const Distrubutor = require('../models/distrubutor')

// get users listing
router.get ('/test',function(req,res,next){
    res.send('respond distobutor')
}); 


//add data
router.post('/add',async(req, res) =>   {
    try {
        const model = new Distrubutor(req.body)
        const result = await model.save(); // theem du lieu vao DB
       if(result){
        res.json({
            "status":200,
            "message": "Thêm thanh công",
            "data": result
        })
       }else{
        res.json({
            "status":400,
            "message": "Thêm thất bại",
            "data": []
        })
        
       }
    } catch(error) {
        console.log(error);

    }
})

router.get('/list', async(req,res)=>{
    const result = await Distrubutor.find({})
      try{
        res.send(result)
        
      }catch (error){
        console.log(error);
      }
}) 
router.get('/getbyid/:id', async(req,res)=>{
   
      try{
        const result = await Distrubutor.findById(req.params.id)
        if(result){
            res.send(result)
        }else{
            res.json({
                "status":400,
                "message": "Không tin thấy ID",
                "data": []
            })           

        }
        
      }catch (error){
        if(error.name==='CastError'){
            res.status(404).send('Invalid ID format')
        }else{
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
      }
}) 


// Sửa
router.patch('/edit/:id', async(req,res)=>{
   
    try{
      const result = await Distrubutor.findByIdAndUpdate(req.params.id,req.body)
      if(result){
          const rs = await result.save()
          res.send(rs)
      }else{
          res.json({
              "status":400,
              "message": "Không tin thấy ID",
              "data": []
          })           

      }
      
    }catch (error){
      if(error.name==='CastError'){
          res.status(404).send('Invalid ID format')
      }else{
          console.log(error);
          res.status(500).send('Internal Server Error')
      }
    }
}) 

// xóa
router.delete('/delete/:id', async(req,res)=>{
   
    try{
      const result = await Distrubutor.findByIdAndDelete(req.params.id)
      if(result){
        res.json({
            "status":200,
            "message": "Xóa thành công",
            "data":result
        })           

          
      }else{
          res.json({
              "status":400,
              "message": "Xóa thất bại",
              "data": []
          })           

      }      
    }catch (error){
      if(error.name==='CastError'){
          res.status(404).send('Invalid ID format')
      }else{
          console.log(error);
          res.status(500).send('Internal Server Error')
      }
    }
}) 
module.exports = router;