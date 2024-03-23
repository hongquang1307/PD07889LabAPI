var express = require('express');
var router = express.Router();
const Upload = require('../config/upload')

// get users listing
router.get ('/test',function(req,res,next){
    res.send('respond Upload')
}); 

router.post('/mulUpload', Upload.array('images',5),async(req,res)=>{
    try{
        const {files} = req
        const urlImages = files.map((file)=>`${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
        console.log(urlImages)

    }catch(error){
        console.log(error)

    }

}); 
module.exports = router;