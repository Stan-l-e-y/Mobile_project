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
import moment from 'moment';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import { useCookies } from 'react-cookie';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  // supabase.auth.getSession();
  const [session] = useState(() => supabase.auth.getSession());
  const [tasks, setTasks] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>('');

  const [get] = useCookies(['my-access-token']);
  const [get2] = useCookies(['my-refresh-token']);

  // if (get2['my-refresh-token'] && get['my-access-token']) {
  //   console.log('wtf');
  //   supabase.auth.setSession({
  //     refresh_token: get2['my-refresh-token'],
  //     access_token: get['my-access-token'],
  //   });
  // } else {
  //   // make sure you handle this case!
  //   // throw new Error('User is not authenticated.')
  // }

  // supabase.auth.getUser();

  //TODO: try to fetch cookie
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

        if (error) {
          console.log('bad');
        }

        if (error && status !== 406) {
          throw error;
        }

        if (data && !profile) {
          setProfile(data);
          //reload here
        }
        await hideLoading();
      } catch (error: any) {
        console.log(error.message);
        showToast({ message: 'Please log in', duration: 5000 });
        await hideLoading();
      }
    };

    getProfile();
  }, [hideLoading, showToast, profile, session]);

  useEffect(() => {
    console.log('use');
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      const { data: taskData, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', profile.id);

      if (taskError) console.log(taskError);
      if (taskData) {
        //filter tasks, if dueDate is greater than or equal today, up

        let updatedTasks = taskData.map(async (task) => {
          //update in supabase
          if (moment(task.dueDate).toDate() <= new Date()) {
            const { data, error } = await supabase
              .from('tasks')
              .update({ isPastDue: true })
              .eq('id', task.id)
              .select();

            if (error) console.log(error);

            //return updated
            if (data) {
              return data[0];
            }
          }

          return task;
        });

        Promise.all(updatedTasks)
          .then((completedTasks) => {
            setTasks(completedTasks);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    if (profile) {
      getTasks();
    }
  }, [profile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    history.push('/login');
  };

  const getTasks = async () => {
    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', profile.id);

    if (taskError) console.log(taskError);
    if (taskData) {
      //filter tasks, if dueDate is greater than or equal today, up
      let updatedTasks = taskData.map(async (task) => {
        //update in supabase
        if (moment(task.dueDate).toDate() <= new Date()) {
          const { data, error } = await supabase
            .from('tasks')
            .update({ isPastDue: true })
            .eq('id', task.id)
            .select();

          if (error) console.log(error);

          //return updated
          if (data) {
            return data[0];
          }
        }

        return task;
      });

      Promise.all(updatedTasks)
        .then((completedTasks) => {
          setTasks(completedTasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          <div className="welcome">Welcome, {profile.first_name}!</div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonList>
          {tasks.map((task) => {
            return (
              <IonItemSliding key={task.id}>
                <IonItemOptions side="start">
                  <IonItemOption color="success">
                    <IonIcon
                      slot="icon-only"
                      icon={checkmarkCircle}
                      onClick={async () => {
                        const { data, error } = await supabase
                          .from('tasks')
                          .update({ progress: 'COMPLETED' })
                          .eq('id', task.id)
                          .select();

                        if (error) console.log(error);
                        if (data)
                          showToast({
                            message: 'Task complete!',
                            duration: 5000,
                          });
                        await getTasks();
                      }}
                    ></IonIcon>
                  </IonItemOption>
                </IonItemOptions>

                <Task
                  task={{
                    id: task.id,
                    name: task.name,
                    description: task.description,
                    progress: task.progress,
                    createdAt: task.createdAt,
                    dueDate: task.dueDate,
                    isPastDue: task.isPastDue,
                  }}
                />

                <IonItemOptions side="end">
                  <IonItemOption color="danger">
                    <IonIcon
                      slot="icon-only"
                      icon={trash}
                      onClick={async () => {
                        const { data, error } = await supabase
                          .from('tasks')
                          .delete()
                          .eq('id', task.id)
                          .select();

                        if (error) console.log(error);
                        if (data)
                          showToast({
                            message: 'Task deleted!',
                            duration: 5000,
                          });

                        await getTasks();
                      }}
                    ></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
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
