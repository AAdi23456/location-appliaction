const mongoose=require("mongoose")
const schema=mongoose.Schema({
  
    email:String,
    search:String
    
})
const regmodel=mongoose.model("searches",schema)
module.exports=regmodel