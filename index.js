const express=require("express")
const route=require("./routes/regestration")
const db=require("./db/mogodb")
const app=express()
app.use(express.json())

app.use("/",route)

app.listen(3000,()=>{
    try {
        db
        console.log("connectted");
    } catch (error) {
        console.log(error);
    }
})