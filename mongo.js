const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://subhamsharmalnps123:mR9bWDWoRqNIsQNv@bewerydb.a0kqg5d.mongodb.net/?retryWrites=true&w=majority&appName=beweryDb")

.then(() => {
    console.log("Connected to MongoDB")
})

.catch(() => {
    console.log("Connection failed to MongoDB")
})


const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



module.exports = users_data