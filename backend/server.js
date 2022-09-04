const express = require('express');
const app = express();
const server = require('http').createServer(app);
const driverObject = {};
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

app.get('/', (req, res)=>{
    res.send('<h1>Hello world Welcome</h1>')
})

io.on("connection", (socket)=>{
  console.log(socket.id);
    socket.on('sendGPS', (data)=>{
        io.emit('receiveGPS', data);
        console.log(data);
    })

    socket.on('new-driver', (driverData)=>{
      driverObject[socket.id] = [driverData.name, driverData.initCoord];
      console.log(driverObject);
      socket.broadcast.emit('new-driver', {uid: socket.id, name: driverData.name, initCoord: driverData.initCoord});
    })

    socket.on('get-driver', (data)=>{
      if(Object.keys(driverObject).length != 0){
        console.log("after get id" + socket.id);
        io.to(socket.id).emit('get-driver', driverObject)
      }
    })

    socket.on('disconnect', ()=>{
      if(!driverObject[socket.id]) return;
      console.log(`Disconnected: ${driverObject[socket.id]}`);
      socket.broadcast.emit('driver-disconnect', socket.id);
      delete driverObject[socket.id];
    })
})


server.listen(3001, ()=>{
    console.log("Server running on port 3001....")
})
