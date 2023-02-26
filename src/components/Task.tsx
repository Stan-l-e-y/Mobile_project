import {
  IonItem,
  IonLabel,
  IonNote,
  IonBadge,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import './Task.css';

export type ITask = {
  id: number;
  name: string;
  description: string;
  progress: 'IN-PROGRESS' | 'COMPLETED' | 'NOT-STARTED';
  createdAt: string;
  dueDate: string;
  isPastDue: boolean;
};

interface ContainerProps {
  task: ITask;
}

const Task: React.FC<ContainerProps> = ({ task }) => {
  return (
    <IonItem>
      <IonLabel>
        <h1>{task.name}</h1>
        <IonNote>{task.description}</IonNote>
      </IonLabel>
      {displayBadge(task.progress, task.isPastDue)}
      {/* <IonIcon slot="end" icon={pencil}></IonIcon> */}
      <IonButton routerLink={`/edittask/${task.id}`}>
        <IonIcon slot="icon-only" icon={pencil}></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default Task;

function displayBadge(
  progress: 'IN-PROGRESS' | 'COMPLETED' | 'NOT-STARTED',
  isPastDue: boolean
) {
  if (isPastDue) {
    return (
      <IonBadge color="danger" slot="" className="status">
        Past-Due
      </IonBadge>
    );
  }

  if (progress === 'COMPLETED') {
    return (
      <IonBadge color="success" slot="" className="status">
        Completed
      </IonBadge>
    );
  } else if (progress === 'IN-PROGRESS') {
    return (
      <IonBadge color="warning" slot="" className="status">
        In-Prog
      </IonBadge>
    );
  } else {
    return (
      <IonBadge color="warning" slot="" className="status">
        Not Started
      </IonBadge>
    );
  }
}
