const mongoose=require("mongoose")
const schema=mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const regmodel=mongoose.model("reg",schema)
module.exports=regmodel