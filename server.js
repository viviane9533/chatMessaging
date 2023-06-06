const io = require('socket.io')(3000) //pass port that we want server to run on ex.(3000) so creates port on 3000

const users = {}

io.on('connection', socket => { //everytime user loads website its going to call this function so gives each user their own socket
   socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected',name)
   })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',{ message: message, name:users[socket.id] })//sends message to all other client except its own
    })
})//now everytime someone connects to server, we send a message to the client sating hellow world