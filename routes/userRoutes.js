var express = require('express');
var router = express.Router();
const modelUsers = require('../models/user');
const Transporter = require('../config/mail');
const Upload = require('../config/upload')

// get users listing
router.get ('/test',function(req,res,next){
    res.send('respond ssss')
}); 


//add data
//đăng ký thành công
router.post('/add',Upload.array('avatar'),async(req,res)=>{
    try {
        const {files} = req
        const urlImages = `${req.protocol}://${req.get('host')}/uploads/${files.filename}`

        const model = new modelUsers(req.body)
        model.avatar = urlImages
        const result = await model.save(); // theem du lieu vao DB
       if(result){
        const mailOption ={
            from : 'binhntpd08526@fpt.edu.vn',
            to: model.email, //email người đăng ký
            subject:'Welcom to Notejs ',
            text :'Chúc mừng đăng ký thành công'
        }
        await Transporter.sendMail(mailOption)
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
    const result = await modelUsers.find({})
      try{
        res.send(result)
        
      }catch (error){
        console.log(error);
      }
}) 
router.get('/getbyid/:id', async(req,res)=>{
   
      try{
        const result = await modelUsers.findById(req.params.id)
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
      const result = await modelUsers.findByIdAndUpdate(req.params.id,req.body)
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
      const result = await modelUsers.findByIdAndDelete(req.params.id)
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