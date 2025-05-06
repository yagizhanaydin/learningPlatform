const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*", // Tüm originlere izin ver (production'da spesifik adres kullanın)
        methods: ["GET", "POST"]
    }
});

// Kullanıcıları ve bağlantıları saklamak için
const users = new Map(); // socket.id -> user info

io.on('connection', (socket) => {
    console.log('Yeni bağlantı:', socket.id);

    // Kullanıcı giriş yaptığında
    socket.on('register', (userData) => {
        users.set(socket.id, {
            id: userData.id || socket.id,
            username: userData.username || `User-${socket.id.slice(0, 5)}`
        });

        console.log(`Kullanıcı kayıt oldu: ${users.get(socket.id).username}`);
        io.emit('userList', Array.from(users.values()));
    });

    // Mesaj gönderildiğinde
    socket.on('sendMessage', (messageData) => {
        const sender = users.get(socket.id);
        if (!sender) return;

        if (messageData.to === 'all') {
            // Genel mesaj
            io.emit('newMessage', {
                from: sender,
                message: messageData.message,
                timestamp: new Date().toISOString()
            });
        } else {
            // Özel mesaj
            const targetSocket = [...users.entries()]
                .find(([_, user]) => user.id === messageData.to);

            if (targetSocket) {
                io.to(targetSocket[0]).emit('newMessage', {
                    from: sender,
                    message: messageData.message,
                    timestamp: new Date().toISOString(),
                    private: true
                });
            }
        }
    });

    // Bağlantı kesildiğinde
    socket.on('disconnect', () => {
        if (users.has(socket.id)) {
            console.log(`Kullanıcı ayrıldı: ${users.get(socket.id).username}`);
            users.delete(socket.id);
            io.emit('userList', Array.from(users.values()));
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Chat sunucusu ${PORT} portunda çalışıyor`);
});