import { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';

const Insure: React.FC = () => {
 
    let insure = window.location.search;
    let params = new URLSearchParams(insure);
    let prize = parseFloat(params.get('prize')!);
    let von = params.get('von');
    let bis = params.get('bis');
    let user = params.get('user');
    let offer = params.get('offer');
  

  // Function to calculate distance using Haversine formula
 
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
      <IonItem style={{ padding: '20px' }}>
            <IonLabel color="primary" style={{fontWeight:'bold' }}>Wähle eine Versicherung</IonLabel>
          </IonItem>
        
          <IonCard >
          <IonItem style={{ padding: '20px' }}>
            <IonLabel>https://appsichern.de/carsharingschutz.html
                
            </IonLabel>
            <IonLabel>4,99€ inkl. Steuern
                
            </IonLabel>
            <Link to={`/tabs/finish?prize=${prize+4.99}&von=${von}&bis=${bis}&user=${user}&offer=${offer}`}> 
                <IonButton color="primary" >
                  Buchen 
                </IonButton>
              </Link>
            
          </IonItem>
            
            
          </IonCard>
          <IonCard >
          <IonItem style={{ padding: '20px' }}>
            <IonLabel>https://versicherung-kurzzeitkennzeichen.com/</IonLabel>
            
          
          <IonLabel>5,99€ inkl. Steuern
                
            </IonLabel>
            <Link to={`/tabs/finish?prize=${prize+5.99}&von=${von}&bis=${bis}&user=${user}&offer=${offer}`}> {/* Navigate to /accept/index */}
                <IonButton color="primary" >
                  Buchen 
                </IonButton>
              </Link>
              </IonItem>
            
          </IonCard>
          <IonCard >
          <IonItem style={{ padding: '20px' }}>
          <IonLabel>https://mietwagenschutz.vwfs.de/</IonLabel>
          
          <IonLabel>3,99€ inkl. Steuern
                
            </IonLabel>
            <Link to={`/tabs/finish?prize=${prize+3.99}&von=${von}&bis=${bis}&user=${user}&offer=${offer}`}> {/* Navigate to /accept/index */}
                <IonButton color="primary" >
                  Buchen 
                </IonButton>
              </Link>
              </IonItem>
            
            
          </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Insure;


