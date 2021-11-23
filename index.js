const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');

const server = app.listen(3000, () => { console.log('Running now!') });

app.use('/workspace01', express.static(path.join(__dirname, 'public')));
app.use('/workspace02', express.static(path.join(__dirname, 'public')));

const io = socketIO(server);

const messages = { workspace01:[], workspace02:[] };

const workspace01 = io.of('/workspace01').on('connection', (socket) => {
    console.log('New connection 01');
    socket.emit('update_msg', messages.workspace01);

    //to receive a msg from front:
    socket.on('event_new_msg', (data) => {
        messages.workspace01.push(data);
        console.log(messages);

        workspace01.emit('update_msg', messages.workspace01);
    })
})

const workspace02 = io.of('/workspace02').on('connection', (socket) => {
    console.log('New connection 02');
    socket.emit('update_msg', messages.workspace02);

    //to receive a msg from front:
    socket.on('event_new_msg', (data) => {
        messages.workspace02.push(data);
        console.log(messages);

        workspace02.emit('update_msg', messages.workspace02);
    })
})
