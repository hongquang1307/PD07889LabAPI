var express = require('express');
var router = express.Router();
const Transporter = require('../config/mail')

// get users listing
router.post('/test',function(req,res,next){
    const mailOption ={
        from : 'binhntpd08526@fpt.edu.vn',
        to: 'binh2004qb@gmail.com',
        subject:'test mail',
        text :'this í test email send Notejs project'
    }
Transporter.sendMail(mailOption, function(error,info){
            if(error){
                res.status(500).json({error:"send email fail" +error})
            } else{
                res.status(200).json({error:"send email seccess" + info.response})
            }
            
        })
    }); 
module.exports = router;