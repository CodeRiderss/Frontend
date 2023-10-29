import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { Order } from '../interfaces/order';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { star } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | undefined>();

  const { userId, } = useAuth();

  const getOrders = async (user: number) => {
    try {
      setOrders((await axios.get<Order[]>(`https://erms.stefhol.eu/api/v1/user/${user}/order`, {})).data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  useEffect(() => {
    getOrders(userId!);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>ShareWheels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader style={{ padding: 10 }}>
          <IonToolbar >
            <IonTitle style={{ padding: 10, fontSize: 24 }} color="primary" class="ion-text-primary">Deine Buchungen</IonTitle>
          </IonToolbar>
        </IonHeader>

        {orders?.map((order) => (
          <IonCard key={order.id}>
            <IonCardHeader>
              <IonCardTitle>{order.offer.car.model}</IonCardTitle>
              <IonCardSubtitle>
                von {order.offer.user.name} {!isNaN(order.offer.user.averageRating) ? order.offer.user.averageRating : "-"}/5.0
                <IonIcon icon={star} style={{ paddingLeft:"0.3rem", color: "orange" }}></IonIcon>
              </IonCardSubtitle>
              <IonCardSubtitle>von {new Date(order.startDate).toDateString()} bis {new Date(order.endDate).toDateString()}</IonCardSubtitle>
              <IonCardSubtitle>{order.priceInEuro}€ Mietkosten</IonCardSubtitle>
            </IonCardHeader>
            <img alt="image link" src={order.offer.car.imageUrl} />
          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
