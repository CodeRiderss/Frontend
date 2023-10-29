import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab5.css';
import axios from 'axios';
import { User } from '../interfaces/user';
import { useAuth } from '../components/AuthContext';
import { useHistory } from 'react-router';
import { star } from 'ionicons/icons';

const Tab5: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();

  const { userId, logout } = useAuth();

  const getUser = async (user: number) => {
    try {
      setUser((await axios.get<User>(`https://erms.stefhol.eu/api/v1/user/${user}`, {})).data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  function calculateAge(birthdate: Date | undefined): number | undefined {
    if (!birthdate) {
      return undefined;
    }

    const currentDate = new Date();
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth();
    const birthDay = birthdate.getDate();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const history = useHistory();

    let age = currentYear - birthYear;

    // Check if the birthday for this year has already occurred
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }

    return age;
  }

  useEffect(() => {
    getUser(userId!);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img alt="Silhouette of mountains" src="https://plus.unsplash.com/premium_photo-1681822817140-bce6c12809fb?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <IonCardHeader>
            <IonCardTitle>{user?.name}</IonCardTitle>
            <IonCardSubtitle>{calculateAge(new Date(user?.birthday!))} Jahre</IonCardSubtitle>
            <IonCardSubtitle>
              {!isNaN(user?.averageRating!) ? user?.averageRating : '-'}/5.0  
              <IonIcon icon={star} style={{ paddingLeft:"0.3rem", color: "orange" }}></IonIcon>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{user?.description}</IonCardContent>
        </IonCard>
        <div style={{ padding: '20px', textAlign: 'left' }}>
          <IonButton expand="full" color="primary">Deine Autos</IonButton>
          <IonButton expand="full" color="primary">Bisherige Buchungen</IonButton>
          <IonButton expand="full" color="primary">Meine Bewertungen</IonButton>
          <IonButton expand="full" color="primary">Hilfe</IonButton>
          <IonButton expand="full" color="primary">Einstellungen</IonButton>
          <IonButton expand="full" onClick={logout}>Logout</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab5;