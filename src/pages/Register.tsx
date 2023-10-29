// Register.tsx
import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonLabel, IonDatetimeButton, IonModal, IonDatetime } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { User } from '../interfaces/user';

const Register: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [birthday, setBirthday] = useState<Date>(new Date('1990-02-19'));
  const [password, setPassword] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleRegister = async () => {
    // Implement your registration logic here
    // If registration is successful
    
    try {
      const response = await axios.post('https://erms.stefhol.eu/api/v1/register', { name, password, description, birthday, experience, telephone, email, profileUrl : "" });
      history.push('/login');
    } catch (error) {
      console.error("registration failed", error);
    }
  };

  const handleDateChange = (value: string) => {
    setBirthday(new Date(value));
  };

  return (
    <IonPage>
      <IonContent>
        <IonLabel>Name</IonLabel>
        <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)} />


        <IonLabel>Description</IonLabel>
        <IonInput type="text" value={description} onIonChange={e => setDescription(e.detail.value!)} />

        <IonLabel>Birthday</IonLabel>
        <IonButton onClick={() => setShowModal(true)}>{birthday.toISOString().split('T')[0]}</IonButton>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonDatetime 
            presentation="date"
            value={birthday.toISOString()}
            onIonChange={e => handleDateChange(e.detail.value! as string)}
          />
          <IonButton onClick={() => setShowModal(false)}>Done</IonButton>
        </IonModal>

        <br></br>

        <IonLabel>Experience</IonLabel>
        <IonInput type="text" value={experience} onIonChange={e => setExperience(e.detail.value!)} />

        <IonLabel>Telephone</IonLabel>
        <IonInput type="text" value={telephone} onIonChange={e => setTelephone(e.detail.value!)} />

        <IonLabel>Email</IonLabel>
        <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
        <IonLabel>Password</IonLabel>
        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        <IonButton expand="full" onClick={handleRegister}>Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;