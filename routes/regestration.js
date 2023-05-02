const express = require('express')
const route = express()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const regmodel = require("../model/regmodel")
const { createClient } =require("redis")

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect();


const validip=require("../middleware/ipaddress")
const serachesmodel=require("../model/searches")

/* This code defines a route for registering a user. When a GET request is made to the "/reg" endpoint,
it extracts the email, name, and password from the request body. It then uses the bcrypt library to
hash the password and store the hashed password along with the email and name in the database using
the regmodel schema. Finally, it sends a response indicating that the registration was successful. */
route.get("/reg", async (req, res) => {
    try {
        const { email, name, password } = req.body
        bcrypt.hash(password,process.env.saltrounds, async function (err, hash) {
            if (err) {
                console.log(err);
                return
            } else {
                const data = regmodel({ name, email, password: hash })
                await data.save()
                return res.send("regestration success")
            }
        });
    } catch (error) {
        console.log(error);
        return
    }
})
route.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email);
        const datafromdb = await regmodel.findOne({ email })
        console.log(datafromdb);
        console.log(datafromdb.length);
        if (datafromdb) {

            bcrypt.compare(password, datafromdb.password, function (err, result) {
                if (err) {
                    return res.send("wrong credentials")
                } if (result) {
                    return res.status(200).send({ msg: "login success", token: jwt.sign({ "id": datafromdb._id }, process.env.key) })
                }
            });
        }
    } catch (error) {
        console.log(error);
        return
    }
})

route.get("/logout", async (req, res) => {
    try {
       
        const {token}=req.headers
        const decoded = jwt.verify(token,process.env.key);
        console.log(decoded);
        if(decoded){
            req.body.email=decoded._id}
       
        await client.set(decoded.id, token)
        return res.status(200).send("logout successfull")
    } catch (error) {
        console.log(error);
        return
    }

})
route.get("/mycity/:ip",validip, async(req,res)=>{
    try {
        const {ip}=req.params
const {email}=req.body
const redis_data=await client.get(ip)
if(redis_data){
    const cinfo=JSON.parse(redis_data)
   return res.status(200).send({location:cinfo})
}
const apiurl=`https://ipapi.co/${ip}/json/`
const response=await fetch(apiurl)
const ipinfo=await response.json()
client.set(ip,JSON.stringify(ipinfo.city),'EX',21600)
const atalasdata=serachesmodel({email,ip:ipinfo.city})
await atalasdata.save()
return res.status(200).send(ipinfo.city)
    } catch (error) {
        console.log(error);
        return res.send("something went wrong")
    }

})
module.exports = route