import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonBackButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Auth.css';
import { RouteComponentProps } from 'react-router';
import TaskForm from '../components/TaskForm';

const CreateTask: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="title">Create Task</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="navAction"
              onClick={() => props.history.push('/login')}
            >
              Log out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <TaskForm />
    </IonPage>
  );
};

export default CreateTask;
