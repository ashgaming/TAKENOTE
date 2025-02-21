const socketIo = require('socket.io');
const userModel = require('./models/user.model');
//const captainModel = require('./models/captain.model');

let io; 


function initializeSocket(server) {
    // Attach socket.io to the server
    io = socketIo(server, {
        cors: {
            origin: 'http://localhost:3000', // Replace with your frontend URL
            methods: ['GET', 'POST'],
        },
    });

    // Set up event listeners
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle the 'join' event
        socket.on('join', async (data) => {
            try {
                // Validate incoming data
                if (!data || !data.userId || !data.userType) {
                    console.error('Invalid data received for "join" event:', data);
                    socket.emit('error', { message: 'Invalid join data' });
                    return;
                }

                const { userId, userType } = data;

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                  //  await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else {
                    console.error('Unknown userType:', userType);
                    socket.emit('error', { message: 'Unknown userType' });
                }
            } catch (error) {
                console.error('Error handling "join" event:', error.message);
                socket.emit('error', { message: 'Server error during join event' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if(!location || !location.ltd || !location.lng ){
                console.log('location error')
                return socket.emit('error',{message:'Invalid Captain Location data'})
            }

            console.log(`captain : ${userId} , updated location to ${location.ltd} || ${location.lng}`)
            const loc = await captainModel.findByIdAndUpdate(userId,  { 
                    location :{ 
                        ltd:location.ltd,
                        lng:location.lng
            } });

         

        })

        socket.on('update-location-user', async (data) => {
            const { userId, location } = data;

            if(!location || !location.ltd || !location.log ){
                return socket.emit('error',{message:'Invalid Location'})
            }

            console.log(`user: ${userId} , updated location to ${location} `)



            await userModel.findByIdAndUpdate(userId, { location });


        })


        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
}

/**
 * Send a message to a specific socket ID.
 * @param {string} socketId - The socket ID to send the message to.
 * @param {Object|string} message - The message to send.
 */
function sendMessageToSocketId(socketId, messageObject) {
    if (!io) {
        console.error('Socket.io instance is not initialized');
        return { success: false, error: 'Socket.io instance is not initialized' };
    }

    if (!socketId) {
        console.error('Invalid socket ID');
        return { success: false, error: 'Invalid socket ID' };
    }

    try {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log(`Message sent to socketId: ${socketId} for event ${messageObject.event}` );
        return { success: true };
    } catch (error) {
        console.error('Error sending message:', error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
