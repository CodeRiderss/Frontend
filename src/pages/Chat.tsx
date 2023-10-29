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
    const [toUserId, setToUserId] = useState<number>();

    const [message, setMessage] = useState<string>("");

    const getMessages = useCallback(async () => {
        if (toUserId === null) return;
    

        console.log("Get messages");
        try {
          const response = await axios.post<Message[]>(`https://erms.stefhol.eu/api/v1/message`, { from : userId, to : toUserId });
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to get messages", error);
        }
      }, [toUserId, userId]);



      const sendMessage = async () => {
        if (toUserId === null) return;
    
        try {
          await axios.post(`https://erms.stefhol.eu/api/v1/user/${userId}/message`, { text: message, to: toUserId });
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
          const toUserIdNumber = parseInt(toUser, 10);
          if (!isNaN(toUserIdNumber)) {
            console.log('Setting toUserId from URL:', toUserIdNumber);
            setToUserId(toUserIdNumber);
          }
        }
      }, [location.search]);
    
      useEffect(() => {
        console.log('Fetching messages...');
        getMessages();
      }, [getMessages]);

  

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
            <IonChip key={message.id} className={message.from.id == userId ? "sent" : "received"}>
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