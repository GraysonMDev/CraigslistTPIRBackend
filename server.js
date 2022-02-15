const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server, 
    { 
    cors: {    
      origin: "*",    
      methods: ["GET", "POST"]  
    }});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("sendMessage", message => {
      console.log(message)
      socket.emit("serverMessage", "hello from the other side")
  })
});

app.get('/', function (req, res, next){
    res.json("hello")
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log('listening on *:3001');
}); 