import { IonChip, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Posteingang.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/user';
import { useAuth } from '../components/AuthContext';

const Tab4: React.FC = () => {

  const history = useHistory();
  const { userId  } = useAuth();

  const [chats, setChats] = useState<User[] | undefined>();

    const getChats = async () => {
        try {
          setChats((await axios.get<User[]>("https://erms.stefhol.eu/api/v1/chat/user/" + userId)).data);
        } catch (error) {
          console.error("Login failed", error);
        }
      };

    useEffect(() => {

        getChats();

    }, []);

  const openChat = (fromUserId : number | null , toUserId : number) => {
    history.push(`/tabs/chat?to=${toUserId}`);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posteingang</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posteingang</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {chats?.map((chat) => (
              <IonItem key={chat.id} button onClick={() => openChat(userId, chat.id)}>
                <IonLabel>{chat.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
