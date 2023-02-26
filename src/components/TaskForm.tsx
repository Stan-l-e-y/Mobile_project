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

import './TaskForm.css';
import type { ITask } from './Task';

interface ContainerProps {
  task?: ITask;
}

const TaskForm: React.FC<ContainerProps> = ({ task }) => {
  return (
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput placeholder="Enter name" required></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonInput placeholder="Enter description" required></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Date due</IonLabel>
        <IonInput placeholder="Enter date due" required></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Status</IonLabel>
        <IonInput placeholder="Enter status" required></IonInput>
      </IonItem>
      <IonButton
        routerLink="/home"
        className="submitBtn"
        expand="full"
        shape="round"
      >
        Submit
      </IonButton>
    </IonContent>
  );
};

export default TaskForm;
