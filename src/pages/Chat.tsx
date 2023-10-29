import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IonContent, IonPage, IonChip, IonLabel, IonItem, IonInput, IonButton, IonFooter, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import axios from 'axios';
import { Message } from '../interfaces/message';
import { MessageRequest } from '../interfaces/messagerequest';
import './Chat.css';
import { useAuth } from '../components/AuthContext';

  const Chat: React.FC = () => {
    const { userId  } = useAuth();

    const [messages, setMessages] = useState<Message[] | undefined>();
    const toUserId= useRef<number>();

    const [message, setMessage] = useState<string>();

      const getMessages = async () => {
        if (toUserId.current === null) return;
    
        console.log(toUserId.current);
        console.log("Get messages");
        try {
          const response = await axios.post<Message[]>(`https://erms.stefhol.eu/api/v1/message`, { from : userId, to : toUserId.current });
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to get messages", error);
        }
      };

      const sendMessage = async () => {
        if (toUserId.current === null) return;
    
        try {
            console.log(message);
            
          await axios.post(`https://erms.stefhol.eu/api/v1/user/${userId}/message`, { text: message, to: toUserId.current });
          setMessage(""); // Clear the current message
          getMessages();   // Optionally, refresh messages after sending
        } catch (error) {
          console.error("Failed to send message", error);
        }
      };

      useEffect(() => {

        const params = new URLSearchParams(location.search);
        const toUser = params.get('to');
        if (toUser) {
          const toUserIdNumber = parseInt(toUser);
          if (!isNaN(toUserIdNumber)) {
            console.log('Setting toUserId from URL:', toUserIdNumber);
            toUserId.current = toUserIdNumber;
          }
        }

        console.log('Fetching messages...');
        getMessages();
      }, []);

  

  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tabs/tab4" />
        </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="chat-container">
          {messages?.map((message) => (
            <IonChip key={message.id} className={message.fromUserId == userId ? "sent" : "received"}>
              <IonLabel>{message.text}</IonLabel>
            </IonChip>
          ))}
        </div>
      </IonContent>
      <IonFooter>
        <IonItem lines="none" className="chat-input-item">
          <IonInput value={message} onIonChange={(e) => setMessage(e.detail.value!)} />
          <IonButton onClick={sendMessage} className="chat-send-button">Send</IonButton>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;