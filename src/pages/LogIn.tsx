import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
} from '@ionic/react';

import './Auth.css';
import { RouteComponentProps } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateSessionInput, createSessionSchema } from '../clientTypes';
import { supabase } from '../supa';

// Stanley Tsonev 101339387

const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
    mode: 'onChange',
  });

  const onSubmit = async (formData: CreateSessionInput) => {
    await showLoading();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      await showToast({ message: error.message, duration: 5000 });
      await hideLoading();
    }

    if (data && !error) {
      await hideLoading();
      history.push('/home');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle className="title">Log In</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="navAction"
              onClick={() => history.push('/signup')}
            >
              Register
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              placeholder="Enter email"
              {...register('email')}
            ></IonInput>
          </IonItem>
          {errors.email ? (
            <div className="errors">{errors.email.message}</div>
          ) : (
            ''
          )}
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              placeholder="Enter password"
              type="password"
              {...register('password')}
            ></IonInput>
          </IonItem>
          {errors.password ? (
            <div className="errors">{errors.password.message}</div>
          ) : (
            ''
          )}
          <IonButton
            className="submitBtn"
            expand="full"
            shape="round"
            type="submit"
          >
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LogIn;
