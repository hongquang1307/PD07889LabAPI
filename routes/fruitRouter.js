var express = require('express');
var router = express.Router();
const modelFruit = require('../models/fruit');
const Upload = require('../config/upload');
const JWT = require('jsonwebtoken')
const SECRECT_KEY ="Binh đzai"

// get users listing
router.get ('/test',function(req,res,next){
    res.send('respond fruit')
}); 


//add data
router.post('/add', Upload.array('images',5),async(req,res)=>{
    try {
        const {files} = req
        const urlImages = files.map((file)=>`${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
        const model = new modelFruit(req.body)
        model.images = urlImages
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
    
      try{
        const authHeader = req.headers['authorization']
        console.log('authHeader',authHeader);
        const token = authHeader && authHeader.split(' ')[1]
         if(!token) return res.sendStatus(401)
         let payload
         JWT.verify(token,SECRECT_KEY, (err, _payload) =>{
            if( err instanceof JWT.TokenExpiredError) return res.sendStatus(401)
            if (err) return res.sendStatus(403)
            payload = _payload
         })

        const result = await modelFruit.find().populate('id_description')
        res.send(result)
        
      }catch (error){
        console.log(error);
      }
}) 
router.get('/getbyid/:id', async(req,res)=>{
   
      try{
        const result = await modelFruit.findById(req.params.id).populate('id_description')
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
router.patch(' :id', async(req,res)=>{
   
    try{
      const result = await modelFruit.findByIdAndUpdate(req.params.id,req.body)
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
      const result = await modelFruit.findByIdAndDelete(req.params.id)
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