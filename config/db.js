const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

// const local = "mongodb://127.0.0.1:27017/MyDatabase"
// ket noi database compass

const alats = "mongodb+srv://binhntpd08526:DEw2zIwwV2PPvgYX@cluster0.twer6yx.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0"
// ket noi database bang alats


const connect = async () => {
    try {
        await mongoose.connect(alats,
        {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log("connect success" )

    } catch (error) {
        console.log(error)
        console.log("connect fail")
    }

}
module.exports = {connect}