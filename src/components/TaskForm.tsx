import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './TaskForm.css';
import type { ITask } from './Task';
import { useState } from 'react';

interface ContainerProps {
  task?: ITask;
  history: any;
}

const TaskForm: React.FC<ContainerProps> = ({ task, history }) => {
  //TODO: create state vars for all fields and error
  const [taskName, setTaskName] = useState<any>(task?.name ?? '');
  const [taskDesc, setTaskDesc] = useState<any>(task?.description ?? '');
  const [taskProg, setTaskProg] = useState<any>(task?.progress ?? '');

  return (
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput
          placeholder="Enter name"
          required
          value={taskName}
          onIonChange={(e) => setTaskName(e.target.value)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonInput
          placeholder="Enter description"
          value={taskDesc}
          onIonChange={(e) => setTaskDesc(e.target.value)}
        ></IonInput>
      </IonItem>
      <IonItem className="datePicker">
        <IonLabel>Date due</IonLabel>
        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

        <IonModal keepContentsMounted={true}>
          <IonDatetime showDefaultButtons={true} id="datetime"></IonDatetime>
        </IonModal>
      </IonItem>
      <IonItem className="statusSelect">
        {task ? (
          <IonSelect
            interface="popover"
            placeholder="Select Status"
            selectedText={taskProg}
            value={taskProg}
            onIonChange={(e) => setTaskProg(e.target.value)}
          >
            <IonSelectOption value="NOT-STARTED">Not-started</IonSelectOption>
            <IonSelectOption value="IN-PROGRESS">In-progress</IonSelectOption>
            <IonSelectOption value="COMPLETED">Completed</IonSelectOption>
          </IonSelect>
        ) : (
          <IonSelect interface="popover" placeholder="Select Status">
            <IonSelectOption value="NOT-STARTED">Not-started</IonSelectOption>
            <IonSelectOption value="IN-PROGRESS">In-progress</IonSelectOption>
            <IonSelectOption value="COMPLETED">Completed</IonSelectOption>
          </IonSelect>
        )}
      </IonItem>
      <IonButton
        className="submitBtn"
        expand="full"
        shape="round"
        onClick={() => submit(history, task)}
      >
        {task ? 'Update' : 'Add Task'}
      </IonButton>
    </IonContent>
  );
};

export default TaskForm;

function submit(history: any, task: ITask | undefined) {
  //validate fields or use reacthookform
  //send post request to createTask
  //if success, redirect to home + toast message
  //else, display error
  if (task) {
    // PUT to api (edit)
  } else {
    // POST to api (create)
  }
  history.push('/');
}
