const express=require('express');
const app=express();
const http = require("http");
const{Server}=require('socket.io');
const cors=require("cors");
app.use(cors())
const server=http.createServer(app)

const io =new Server(server,{
    cors:{
        origin:"http://10.113.19.100:3000",
        methods:["GET","POST"],

    },
});
io.on("connection",(socket)=>{
    console.log(`user connected:${socket.id}`);
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("receive_message",data);
        console.log(data);
    });
});

server.listen(3009,()=>{
    console.log("server is running")
});