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
import { CreateUserInput, createUserSchema } from '../clientTypes';
import { supabase } from '../supa';

const SignUp: React.FC<RouteComponentProps> = (props) => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange',
  });

  const onSubmit = async (formData: CreateUserInput) => {
    await showLoading();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          email: formData.email,
        },
      },
    });

    if (error) {
      await showToast({ message: error.message, duration: 5000 });
      await hideLoading();
    }

    if (data && !error) {
      await hideLoading();
      props.history.push('/login');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle className="title">Sign Up</IonTitle>
          <IonButtons slot="end">
            <IonButton
              className="navAction"
              onClick={() => props.history.push('/login')}
            >
              Log in
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel position="floating">First Name</IonLabel>
            <IonInput
              placeholder="Enter first name"
              {...register('firstName')}
            ></IonInput>
          </IonItem>
          {errors.firstName ? (
            <div className="errors">{errors.firstName.message}</div>
          ) : (
            ''
          )}
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              placeholder="Enter email"
              type="email"
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
            type="submit"
            className="submitBtn"
            expand="full"
            shape="round"
          >
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
