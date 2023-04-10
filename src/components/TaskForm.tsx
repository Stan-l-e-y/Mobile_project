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
  useIonLoading,
  useIonToast,
} from '@ionic/react';

import './TaskForm.css';
import type { ITask } from './Task';
import { useState, useEffect } from 'react';
import { supabase } from '../supa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { CreateTaskInput, createTaskSchema } from '../clientTypes';
import { useSetTasks } from '../store';

interface ContainerProps {
  task?: any;
  history: any;
  type: 'CREATE' | 'EDIT';
  profile: any;
}

const TaskForm: React.FC<ContainerProps> = ({
  task,
  history,
  type,
  profile,
}) => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const setTasks = useSetTasks();

  const dateNow = getDateTimeNow();

  //Allows us to track form changes, error handle and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  useEffect(() => {
    if (task && task[0]) {
      reset({
        name: task[0].name,
        dueDate: task[0].dueDate,
        description: task[0].description,
        progress: task[0].progress,
      });
    }
  }, [reset, task]);

  const onSubmit = async (formData: CreateTaskInput) => {
    if (type === 'CREATE') {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .insert({
            name: formData.name,
            description: formData.description,
            progress: formData.progress,
            dueDate: formData.dueDate,
            user_id: profile.id,
          })
          .select();

        if (error) {
          console.log(error);
          showToast({ message: error.message, duration: 5000 });
          throw error;
        }

        if (data) {
          setTasks(supabase, profile.id);
          showToast({ message: 'Successfully created!', duration: 5000 });
          history.push({ pathname: '/home' });
        }
        await hideLoading();
      } catch (error: any) {
        showToast({ message: error.message, duration: 5000 });
        await hideLoading();
      }
    } else {
      //User is attempting to update a task
      try {
        const { data, error } = await supabase
          .from('tasks')
          .update({
            name: formData.name,
            description: formData.description,
            progress: formData.progress,
            dueDate: formData.dueDate,
            isPastDue:
              moment(formData.dueDate).toDate() <= new Date() ? true : false,
          })
          .eq('id', task[0].id)
          .select();

        if (error) {
          console.log(error);
          showToast({ message: error.message, duration: 5000 });
          throw error;
        }

        if (data) {
          setTasks(supabase, profile.id);
          showToast({ message: 'Successfully edited!', duration: 5000 });
          history.push({ pathname: '/home' });
        }
        await hideLoading();
      } catch (error: any) {
        showToast({ message: error.message, duration: 5000 });
        await hideLoading();
      }
    }
  };

  return (
    <IonContent className="ion-padding">
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            placeholder="Enter name"
            required
            {...register('name')}
          ></IonInput>
          {errors.name && <div className="error">{errors.name.message}</div>}
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            placeholder="Enter description"
            {...register('description')}
          ></IonInput>
          {errors.description && (
            <div className="error">{errors.description.message}</div>
          )}
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
          {errors.dueDate && (
            <div className="error">{errors.dueDate.message}</div>
          )}
        </IonItem>
        <IonItem className="statusSelect">
          {task ? (
            <IonSelect
              interface="popover"
              placeholder="Select Status"
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
          {errors.progress && (
            <div className="error">{errors.progress.message}</div>
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
}
