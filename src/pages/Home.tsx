import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { add, checkmarkCircle, trash } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import Task from '../components/Task';
import { supabase } from '../supa';
import { useEffect, useState } from 'react';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const [session] = useState(() => supabase.auth.getSession());

  const [profile, setProfile] = useState({
    firstName: '',
  });
  useEffect(() => {
    getProfile();
  }, [session]);
  const getProfile = async () => {
    console.log('get');

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name`)
        .eq('id', userData.user!.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile({
          firstName: data.first_name,
        });
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
        <IonToolbar>
          <IonTitle size="large">Tasks</IonTitle>
          <IonButtons collapse={true} slot="end">
            <IonButton className="navAction" onClick={() => signOut()}>
              Log Out
            </IonButton>
          </IonButtons>
          <div className="welcome">Welcome, {profile.firstName}!</div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonList>
          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption color="success">
                <IonIcon slot="icon-only" icon={checkmarkCircle}></IonIcon>
              </IonItemOption>
            </IonItemOptions>

            <Task
              task={{
                id: 1,
                name: 'Wash Dishes',
                description: 'try to finish by 5pm',
                progress: 'IN-PROGRESS',
                createdAt: 'today',
                dueDate: 'tomorrow',
                isPastDue: false,
              }}
            />

            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption color="success">
                <IonIcon slot="icon-only" icon={checkmarkCircle}></IonIcon>
              </IonItemOption>
            </IonItemOptions>

            <Task
              task={{
                id: 2,
                name: 'Walk dog',
                description: '',
                progress: 'IN-PROGRESS',
                createdAt: 'today',
                dueDate: 'tomorrow',
                isPastDue: false,
              }}
            />

            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption color="success">
                <IonIcon slot="icon-only" icon={checkmarkCircle}></IonIcon>
              </IonItemOption>
            </IonItemOptions>

            <Task
              task={{
                id: 3,
                name: 'Go to gym',
                description: 'do a lower body workout',
                progress: 'COMPLETED',
                createdAt: 'today',
                dueDate: 'tomorrow',
                isPastDue: false,
              }}
            />

            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption color="success">
                <IonIcon slot="icon-only" icon={checkmarkCircle}></IonIcon>
              </IonItemOption>
            </IonItemOptions>

            <Task
              task={{
                id: 3,
                name: 'Finish book',
                description: 'left on page 238',
                progress: 'COMPLETED',
                createdAt: 'today',
                dueDate: 'tomorrow',
                isPastDue: true,
              }}
            />

            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/createtask')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
