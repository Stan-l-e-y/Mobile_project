import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import { supabase } from './supa';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import {
  useProfile,
  useSession,
  useSetProfile,
  useSetSession,
  useSetTasks,
} from './store';

setupIonicReact();

const App: React.FC = () => {
  const session = useSession();
  const setSession = useSetSession();
  const setProfile = useSetProfile();
  const profile = useProfile();
  const setTasks = useSetTasks();
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
      // delete cookies on sign out
      const expires = new Date(0).toUTCString();
      document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      console.log('siggg');
      const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
      document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    }
  });

  useEffect(() => {
    async function handleAsync() {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }

    if (!session) {
      console.log(session);
      handleAsync();
    }
  }, [session, setSession]);

  useEffect(() => {
    if (session) {
      console.log('setinggg');
      setProfile(supabase);
    }
  }, [session, setProfile]);

  useEffect(() => {
    if (profile) {
      setTasks(supabase, profile.id);
    }
  }, [profile, setTasks]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home}>
            {/* <Home /> */}
          </Route>
          <Route exact path="/createtask" component={CreateTask} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route path="/edittask/:id" component={EditTask} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
