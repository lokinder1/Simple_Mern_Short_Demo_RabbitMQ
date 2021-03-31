const express = require("express");
var cors = require('cors');
const amqp = require('amqplib/callback_api');


const app = express();
app.use(cors());



// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = 'node_queue'
        channel.assertQueue(QUEUE);
        // Step 4: Receive Messages
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)
        }, {
            noAck: true
        })
    })
})

app.listen({ port: 4002 }, () =>
  console.log(`🚀 Server ready at http://localhost:4002`)
);
