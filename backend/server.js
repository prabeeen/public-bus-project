const express = require('express');
const path = require("path")
const app = express();
const cors = require('cors')
const server = require('http').createServer(app);
const mongoose = require('mongoose')
const usersRoutes = require('./routes/users')
const paymentsRoutes = require('./routes/payments')
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/images',express.static(__dirname + '/images/'))
console.log(path.join(__dirname,'images'))

const driverObject = {};
const roomObject = {};

app.use(cors({
  origin: "http://localhost:4200"
}));
app.use(express.json())


mongoose.connect("mongodb+srv://prabin171342:2dQKZ1t9eau4jwk6@cluster0.wkgme8i.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("database connected")
})
.catch((error)=>{
  console.log("failed to connect to database")
});


app.get('/', (req, res)=>{
  res.send('<h1>Hello world Welcome</h1>')
})


app.use('/api/users', usersRoutes);
app.use('/api/payment', paymentsRoutes);


const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
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


server.listen(3001, ()=>{
    console.log("Server running on port 3001....")
})
