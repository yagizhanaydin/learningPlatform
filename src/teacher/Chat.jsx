import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css'

const socket = io('http://localhost:5000');

function Chat() {
    const [username, setUsername] = useState('');
    const [registered, setRegistered] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [recipient, setRecipient] = useState('all');
    const messagesEndRef = useRef(null);

    // Kullanıcı kaydı
    const registerUser = () => {
        if (username.trim()) {
            socket.emit('register', {
                username: username.trim(),
                id: Date.now().toString()
            });
            setRegistered(true);
        }
    };

    // Mesaj gönder
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', {
                to: recipient,
                message: message.trim()
            });
            setMessage('');
        }
    };

    useEffect(() => {
        // Mesaj dinleyicisi
        socket.on('newMessage', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        // Kullanıcı listesi dinleyicisi
        socket.on('userList', (userList) => {
            setUsers(userList);
        });

        return () => {
            socket.off('newMessage');
            socket.off('userList');
        };
    }, []);

    // Mesajlar değiştiğinde en alta kaydır
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!registered) {
        return (
            <div className="register">
                <h2>Chat'e Hoş Geldiniz</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Kullanıcı adınız"
                />
                <button onClick={registerUser}>Giriş Yap</button>
            </div>
        );
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Canlı Sohbet</h2>
                <div className="current-user">Kullanıcı: {username}</div>
            </div>

            <div className="chat-users">
                <h3>Online Kullanıcılar</h3>
                <ul>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="recipient"
                                checked={recipient === 'all'}
                                onChange={() => setRecipient('all')}
                            />
                            Herkese
                        </label>
                    </li>
                    {users.filter(u => u.id !== socket.id).map(user => (
                        <li key={user.id}>
                            <label>
                                <input
                                    type="radio"
                                    name="recipient"
                                    checked={recipient === user.id}
                                    onChange={() => setRecipient(user.id)}
                                />
                                {user.username}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.from.id === socket.id ? 'own' : ''} ${msg.private ? 'private' : ''}`}
                    >
                        <div className="message-header">
                            <strong>{msg.from.username}</strong>
                            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                            {msg.private && <span className="private-badge">Özel</span>}
                        </div>
                        <div className="message-content">{msg.message}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Gönder</button>
            </div>
        </div>
    );
}

export default Chat;