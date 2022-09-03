const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

app.get('/', (req, res)=>{
    res.send('<h1>Hello world Welcome</h1>')
})

io.on("connection", (socket)=>{
  // console.log(socket);
    // console.log(socket.id);
	// console.log("connected");
  console.log(socket.id);
    socket.on('sendGPS', (data)=>{
        io.emit('receiveGPS', data);
        console.log(data);
    })
})

// io.on('sendGPS', (message)=>{
// 	console.log(message);

// })

server.listen(3001, ()=>{
    console.log("Server running on port 3001....")
})
