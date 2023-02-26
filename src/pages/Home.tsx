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
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { add, checkmarkCircle, trash } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

const Home: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
          <IonButtons collapse={true} slot="end">
            <IonButton>Log Out</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <div className="welcome">Welcome, Bob!</div>
          <IonToolbar>
            <IonTitle size="large">Tasks</IonTitle>
            <IonButtons collapse={true} slot="end">
              <IonButton
                className="navAction"
                onClick={() => props.history.push('/login')}
              >
                Log Out
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <IonList>
          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption color="success">
                <IonIcon slot="icon-only" icon={checkmarkCircle}></IonIcon>
              </IonItemOption>
            </IonItemOptions>

            <IonItem>
              <IonCheckbox slot="start" />
              <IonLabel>
                <h1>Create Idea</h1>
                <IonNote>Run Idea by Brandy</IonNote>
              </IonLabel>
              <IonBadge color="success" slot="end">
                5 Days
              </IonBadge>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption color="danger">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
