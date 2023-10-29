import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IonContent, IonPage, IonChip, IonLabel, IonItem, IonInput, IonButton, IonFooter, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon } from '@ionic/react';
import axios from 'axios';
import { Message } from '../interfaces/message';
import './Chat.css';
import { useAuth } from '../components/AuthContext';
import { Order } from '../interfaces/order';
import { star } from 'ionicons/icons';

const DigitalKey: React.FC = () => {
    const { userId } = useAuth();
    const [order, setOrder] = useState<Order | undefined>();

    const getOrder = async (orderId: string) => {
        try {
            setOrder((await axios.get<Order>(`https://erms.stefhol.eu/api/v1/order/${orderId}`, {})).data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const isActive = useCallback(() => {
        const currentDate = new Date();
        if (order && currentDate < new Date(order!.endDate) && currentDate > new Date(order!.startDate)) {
            return true;
        }
        return false;
    }, [order]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const orderId = params.get('orderId');

        getOrder(orderId!);
    }, []);

    if (order) {
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
                            <IonButtons slot="start">
                                <IonBackButton defaultHref="/tab3" />
                            </IonButtons>
                            <IonTitle style={{ padding: 10, fontSize: 24 }} color="primary" class="ion-text-primary">Dein Digital Key</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle style={{ fontSize: 24 }}>{order!.offer.car.model}</IonCardTitle>
                            <IonCardSubtitle style={{ fontSize: 18 }}>
                                von {order.offer.user.name} {!isNaN(order.offer.user.averageRating) ? order.offer.user.averageRating : "-"}/5.0
                                <IonIcon icon={star} style={{ paddingLeft: "0.3rem", color: "orange" }}></IonIcon>
                            </IonCardSubtitle>
                            <IonCardSubtitle style={{ fontSize: 18 }}>von {new Date(order.startDate).toDateString()} bis {new Date(order.endDate).toDateString()}</IonCardSubtitle>
                            <IonCardSubtitle style={{ fontSize: 18 }}>{order.priceInEuro}€ Mietkosten</IonCardSubtitle>
                        </IonCardHeader>
                        <img alt="image link" src={order.offer.car.imageUrl} />
                        <IonCardHeader>
                            {isActive() ? 
                                <>
                                    <IonCardTitle style={{ paddingTop: "16px", textAlign: 'center', color: "#79a083", fontSize: 24 }}>Aktiv</IonCardTitle> 
                                    <IonCardTitle style={{ textAlign: 'center', color: "#79a083", fontSize: 18 }}>Der Digital Key ist aktiv und kann genutzt werden, um den {order!.offer.car.model} zu benutzen</IonCardTitle> 
                                </>
                                : 
                                <>
                                    <IonCardTitle style={{ paddingTop: "16px", textAlign: 'center', color: "red", fontSize: 24 }}>Inaktiv</IonCardTitle>
                                    <IonCardTitle style={{ textAlign: 'center', color: "red", fontSize: 18 }}>Der Digital Key ist nicht aktiv und kann daher aktuell nicht für den {order!.offer.car.model} genutzt werden</IonCardTitle>
                                </>
                            }
                        </IonCardHeader>
                    </IonCard>

                </IonContent>
            </IonPage>
        );
    } else {
        return <></>
    }

};

export default DigitalKey;