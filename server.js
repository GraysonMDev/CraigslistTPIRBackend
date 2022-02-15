const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");

const users = ["Server"]

const io = require("socket.io")(server, 
    { 
    cors: {    
      origin: "*",    
      methods: ["GET", "POST"]  
    }});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("login", message => {
      console.log(message)
      users.push(message)
      socket.emit("serverMessage", users)
  })
});

app.get('/', function (req, res, next){
    res.json("hello")
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log('listening on *:3001');
}); 