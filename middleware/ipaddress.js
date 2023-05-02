const jwt=require("jsonwebtoken")
require("dotenv").config()
const { createClient } =require("redis")
const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect();
const valformat = async function (req, res, next) {
    try {
        const {token}=req.headers
        const decoded = jwt.verify(token,process.env.key);
            console.log(decoded);
            if(decoded){
                req.body.id=decoded.id
           
             const checkblacklist=await client.get(decoded.id)
              if(token==checkblacklist){
                return res.status(400).send("please login again")
              }
            
    
            const { ip } = req.params
            const ipregex = /^(\d{1,3}\.){3}\d{1,3}$/
            if (!ipregex.test(ip)) {
                return res.status(400).send({ msg: "invalid ip format" })
            }
            
              return  next()
        }
        return res.send({msg:"please provide the token"})
    } catch (error) {
        console.log(error);
        return
    }
  
}
module.exports=valformat