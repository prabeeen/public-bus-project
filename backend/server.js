const express = require('express');
const app = express();
const server = require('http').createServer(app);
const driverObject = {};
const roomObject = {};
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
        socket.to(roomObject[socket.id]).emit('receiveGPS', {uid: socket.id, coordData: data});
    })

    socket.on('new-driver', (driverVal)=>{
      driverObject[socket.id] = driverVal.name;
      roomObject[socket.id] = [driverVal.busType];
      socket.join(roomObject[socket.id]);
      // console.log(driverObject);
      // console.log(roomObject);
      socket.broadcast.emit('new-driver', {uid: socket.id, name: driverVal.name});
    })

    socket.on('get-driver', (data)=>{
      if(Object.keys(driverObject).length != 0){
        io.to(socket.id).emit('get-driver', driverObject)
      }
    })

    socket.on('join-room', (roomName)=>{
      socket.join(roomName);
      // console.log(io.sockets.adapter.rooms.get(roomName).size);
    })

    socket.on('leave-room', (dumdata)=>{
      if(Object.entries(roomObject[socket.id]).length > 0)
      {
        for(const room of roomObject[socket.id]){
          socket.leave(room);
          // console.log(io.sockets.adapter.rooms.get(room).size);
        }
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
