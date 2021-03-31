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
        // Step 4: Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from('hello from its coding time'));
        console.log(`Message send ${QUEUE}`);
    })
})



app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001`)
);
