const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service :"gmail",
    auth:{
        user:"binhntpd08526@fpt.edu.vn",
        pass:"r v r q n n p r m u z o l j l a"
    }
})
module.exports = transporter