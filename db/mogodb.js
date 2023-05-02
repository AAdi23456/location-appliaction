const mongoose=require("mongoose")
require("dotenv").config()
 const atlas=mongoose.connect(process.env.dburl)

 module.exports=atlas