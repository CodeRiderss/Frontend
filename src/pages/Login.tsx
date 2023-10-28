// Login.tsx
import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Login: React.FC = () => {
  const history = useHistory();
  const { login, isAuthenticated  } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          history.push('/tabs');
        }
      
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonLabel>Email</IonLabel>
        <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
        <IonLabel>Password</IonLabel>
        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        <IonButton expand="full" onClick={handleLogin}>Login</IonButton>
        <a href='/register'>Register</a>
      </IonContent>
    </IonPage>
  );
};

export default Login;