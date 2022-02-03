const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: { origin: "*"}})


app.get('/join', (req, res) => {
    res.render('join')
})


server.listen(3001, () => {
    console.log('test');
})

io.on('connection', (socket) => {
    console.log
});