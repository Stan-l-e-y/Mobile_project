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
import { useState, useEffect } from 'react';
import { supabase } from '../supa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { CreateTaskInput, createTaskSchema } from '../clientTypes';

interface ContainerProps {
  task?: ITask;
  history: any;
  type: 'CREATE' | 'EDIT';
}

const TaskForm: React.FC<ContainerProps> = ({ task, history, type }) => {
  //TODO: create state vars for all fields and error
  const [taskName, setTaskName] = useState<any>(task?.name ?? '');
  const [taskDesc, setTaskDesc] = useState<any>(task?.description ?? '');
  const [taskProg, setTaskProg] = useState<any>(task?.progress ?? '');

  const dateNow = getDateTimeNow();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    mode: 'onChange',
    defaultValues: {
      dueDate: dateNow,
      name: '',
      description: '',
      progress: 'IN-PROGRESS',
    },
  });

  const onSubmit = async (formData: CreateTaskInput) => {
    if (type === 'CREATE') {
      //
    } else {
      //
    }
    // await showLoading();
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: formData.email,
    //   password: formData.password,
    // });
    // if (error) {
    //   await showToast({ message: error.message, duration: 5000 });
    //   await hideLoading();
    // }
    // if (data && !error) {
    //   await hideLoading();
    //   history.push('/');
    // }
    console.log(formData);
  };

  return (
    <IonContent className="ion-padding">
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            placeholder="Enter name"
            required
            value={taskName}
            onIonChange={(e) => setTaskName(e.target.value)}
            {...register('name')}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            placeholder="Enter description"
            value={taskDesc}
            onIonChange={(e) => setTaskDesc(e.target.value)}
            {...register('description')}
          ></IonInput>
        </IonItem>
        <IonItem className="datePicker">
          <IonLabel>Date due</IonLabel>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            {/* @ts-ignore */}
            <IonDatetime
              showDefaultButtons={true}
              id="datetime"
              {...register('dueDate')}
            ></IonDatetime>
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
              {...register('progress')}
            >
              <IonSelectOption value="NOT-STARTED">Not-started</IonSelectOption>
              <IonSelectOption value="IN-PROGRESS">In-progress</IonSelectOption>
              <IonSelectOption value="COMPLETED">Completed</IonSelectOption>
            </IonSelect>
          ) : (
            <IonSelect
              interface="popover"
              placeholder="Select Status"
              {...register('progress')}
            >
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
          type="submit"
        >
          {task ? 'Update' : 'Add Task'}
        </IonButton>
      </form>
    </IonContent>
  );
};

export default TaskForm;

function getDateTimeNow() {
  const now = moment();
  const timeZoneOffset = moment().format('Z');
  return now.format(`YYYY-MM-DDTHH:mm:ss${timeZoneOffset}`);
  // return now;
}
