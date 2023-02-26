import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Auth.css';
import { RouteComponentProps } from 'react-router';

const LogIn: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle className="title">Log In</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="navAction"
              onClick={() => props.history.push('/signup')}
            >
              Register
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput placeholder="Enter username" required></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            placeholder="Enter password"
            type="password"
            required
          ></IonInput>
        </IonItem>
        <IonButton
          className="submitBtn"
          expand="full"
          shape="round"
          onClick={() => props.history.push('/')}
        >
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LogIn;
