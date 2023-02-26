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
import type { ITask } from '../components/Task';

interface EditTaskPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EditTask: React.FC<EditTaskPageProps> = ({ history, match }) => {
  //TODO: use match.params.id and fetch the task from api, pass task to TaskForm

  const testTask: ITask = {
    id: 1,
    name: 'Wash Dishes',
    description: 'try to finish by 5pm',
    progress: 'IN-PROGRESS',
    createdAt: 'today',
    dueDate: 'tomorrow',
    isPastDue: false,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="title">Edit Task {match.params.id}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="navAction"
              onClick={() => history.push('/login')}
            >
              Log out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <TaskForm history={history} task={testTask} />
    </IonPage>
  );
};

export default EditTask;
