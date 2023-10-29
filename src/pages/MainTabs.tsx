// MainTabs.tsx
import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { searchOutline, pricetagsOutline, personOutline } from 'ionicons/icons';

import Tab1 from './Tab1'; // Assuming you have these components created
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Posteingang';
import Tab5 from './Tab5';
import Chat from './Chat';
import Search from './Search';
import Insure from './Insure';
import Finish from './Finish';

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/tab1" component={Tab1} />
        <Route exact path="/tabs/tab2" component={Tab2} />
        <Route path="/tabs/tab3" component={Tab3} />
        <Route exact path="/tabs/tab4" component={Tab4} />
        <Route path="/tabs/chat" component={Chat} />
        <Route path="/tabs/tab5" component={Tab5} />
        <Route path="/tabs/search" component={Search} exact />
        <Route path="/tabs/insure" component={Insure} exact />
        <Route path="/tabs/finish" component={Finish} exact />
        <Redirect exact from="/tabs" to="/tabs/tab1" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/tab1">
          <IonIcon aria-hidden="true" icon={searchOutline} />
          <IonLabel>Suche</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon aria-hidden="true" icon={pricetagsOutline} />
          <IonLabel>Anbieten</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Buchungen</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/tab4">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Posteingang</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/tabs/tab5">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;