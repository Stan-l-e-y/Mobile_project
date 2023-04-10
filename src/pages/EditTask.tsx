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
import moment from 'moment';

// Stanley Tsonev 101339387

interface EditTaskPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EditTask: React.FC<EditTaskPageProps> = ({ history, match }) => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const [session] = useState(() => supabase.auth.getSession());

  const [profile, setProfile] = useState<any>(null);
  const [task, setTask] = useState<any>({
    dueDate: getDateTimeNow(),
    name: '',
    description: '',
    progress: 'IN-PROGRESS',
  });

  useEffect(() => {
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
    getProfile();
  }, [hideLoading, session, showToast]);

  const signOut = async () => {
    await supabase.auth.signOut();
    history.push('/login');
  };

  useEffect(() => {
    if (profile) {
      const getTask = async () => {
        const { data: taskData, error: taskError } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', match.params.id);

        if (taskError) console.log(taskError);
        if (taskData) {
          setTask(taskData);
        }
      };
      getTask();
    }
  }, [match.params.id, profile]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="title">Edit Task {match.params.id}</IonTitle>
          <IonButtons slot="end">
            <IonButton className="navAction" onClick={() => signOut()}>
              Log out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <TaskForm history={history} task={task} type={'EDIT'} profile={profile} />
    </IonPage>
  );
};

export default EditTask;

function getDateTimeNow() {
  const now = moment();
  const timeZoneOffset = moment().format('Z');
  return now.format(`YYYY-MM-DDTHH:mm:ss${timeZoneOffset}`);
}
