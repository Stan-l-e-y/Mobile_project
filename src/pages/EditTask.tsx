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
  useIonLoading,
  useIonToast,
} from '@ionic/react';

import './Auth.css';
import { RouteComponentProps } from 'react-router';
import TaskForm from '../components/TaskForm';
import type { ITask } from '../components/Task';
import { useState, useEffect } from 'react';
import { supabase } from '../supa';

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

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const [session] = useState(() => supabase.auth.getSession());

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, [session]);
  const getProfile = async () => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', userData.user!.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
      await hideLoading();
    } catch (error: any) {
      showToast({ message: error.message, duration: 5000 });
      await hideLoading();
    }
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    history.push('/login');
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
      <TaskForm
        history={history}
        task={testTask}
        type={'EDIT'}
        profile={profile}
      />
    </IonPage>
  );
};

export default EditTask;
