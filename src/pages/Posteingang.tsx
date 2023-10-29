import { IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
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
            <IonCard key={chat.id} button onClick={() => openChat(userId, chat.id)}>
              <IonCardHeader>
                <IonItem lines="none">
                <IonAvatar slot="start" className="large-avatar">
                  <img alt="Profile" src={chat.profileUrl ?? "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"} />
                </IonAvatar>
                  <IonCardTitle>{chat.name}</IonCardTitle>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          ))}
          </IonList>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
