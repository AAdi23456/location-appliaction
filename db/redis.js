const {createClient}=require("redis")
const client = createClient({
    password: process.env.redis_SecKey,
    socket: {
        host: process.env.host,
        port: 19787
    }
});

module.exports=client