const express = require('express');
const app = express();
const cors = require('cors')
const server = require('http').createServer(app);
const driverObject = {};
const roomObject = {};

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})
app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('<h1>Hello world Welcome</h1>')
})

io.on("connection", (socket)=>{
  console.log(socket.id);
    socket.on('sendGPS', (data)=>{
      // console.log(data)
      console.log(`driver sending data to: ${roomObject[socket.id]}`)
        socket.to(roomObject[socket.id]).emit('receiveGPS', {uid: socket.id, coordData: data});
    })

    socket.on('new-driver', (driverVal)=>{
      driverObject[socket.id] = [driverVal.name, driverVal.id];
      roomObject[socket.id] = [driverVal.busType];
      socket.join(roomObject[socket.id]);
      // console.log(driverObject);
      // console.log(roomObject);
      socket.broadcast.emit('new-driver', {uid: socket.id, name: driverVal.name, id: driverVal.id});
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
      socket.to(roomObject[socket.id]).emit('remove-marker', socket.id)
      if(Object.entries(roomObject[socket.id]).length > 0)
      {
        for(const room of roomObject[socket.id]){
          console.log(room)
          socket.leave(room);
          // console.log(io.sockets.adapter.rooms.get(room).size);
        }
      }
      console.log(`Rooms after leaving: ${roomObject[socket.id]}`)

      console.log(`${socket.id} : ${driverObject[socket.id]}`)
    })

    socket.on('private-connection', (values)=>{
      socket.leave(values[0]);
      roomObject[values[1]].push(socket.id);
      console.log(`Establishing private connection: ${roomObject}`);
    })

    socket.on('disconnect', ()=>{
      if(!driverObject[socket.id]) return;
      console.log(`Disconnected: ${driverObject[socket.id]}`);
      socket.broadcast.emit('driver-disconnect', socket.id);
      delete driverObject[socket.id];
    })
})



app.post('/api/payment',(req, res)=>{
const paymentData = req.body;
console.log(paymentData);
res.send('<h1>successful</h1>');
})





server.listen(3001, ()=>{
    console.log("Server running on port 3001....")
})
