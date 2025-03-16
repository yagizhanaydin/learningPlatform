import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "../assets/Chat.module.css"; 

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
 
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

   
    const fetchUserdata = async () => {
      try {
        const response = await axios.get("/userdata");
        setUserdata(response.data);
      } catch (error) {
        console.error("Kullanıcı verisi alınamadı:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get("/messages");
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("Gelen veri dizi değil:", response.data);
          setMessages([]); 
        }
      } catch (error) {
        console.error("Önceki mesajlar alınamadı:", error);
        setMessages([]);
      }
    };
    

    fetchUserdata();
    fetchMessages();

    return () => {
      socket.off("chat message");
    };
  }, []);

  const saveMessage = async (chatMessage) => {
    try {
      await axios.post("/messagesakla", chatMessage);
    } catch (error) {
      console.error("Mesaj kaydedilemedi:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userdata) {
      const chatMessage = { name: userdata.name, text: message };

      socket.emit("chat message", chatMessage);
      saveMessage(chatMessage);

      setMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2>Canlı Sohbet</h2>
      <div className={styles.chatWrapper}>
    
        <div className={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.messageBox} ${msg.name === userdata?.name ? styles.myMessage : styles.otherMessage}`}>
              <strong>{msg.name}:</strong> {msg.text}
            </div>
          ))}
        </div>

   
        <div className={styles.otherChats}>
          <h3>Diğer Konuşmalar</h3>
          <ul>
            <li>Konuşma 1</li>
            <li>Konuşma 2</li>
            <li>Konuşma 3</li>
          </ul>
        </div>
      </div>

      <form onSubmit={sendMessage} className={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesajınızı yazın..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Gönder
        </button>
      </form>
    </div>
  );
}

export default Chat;