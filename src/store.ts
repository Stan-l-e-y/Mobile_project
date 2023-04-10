import { Session, SupabaseClient } from '@supabase/supabase-js';
import moment from 'moment';
import { create } from 'zustand';

export interface GlobalState {
  session: any;
  setSession: (session: Session | null) => void;
  tasks: any;
  setTasks: (
    supabase: SupabaseClient<any, 'public', any>,
    profileId: any
  ) => void;
  profile: any;
  setProfile: (
    supabase: SupabaseClient<any, 'public', any>,
    reset?: boolean
  ) => void;
}

const useGlobalStore = create<GlobalState>()((set, get) => ({
  session: null,
  tasks: [],
  profile: null,
  setSession: async (session) => {
    set((state) => ({
      session: session,
    }));
  },
  setTasks: async (supabase, profileId) => {
    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', profileId);

    if (taskError) console.log(taskError);
    if (taskData) {
      //filter tasks, if dueDate is greater than or equal today, up

      let updatedTasks = taskData.map(async (task: any) => {
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
          set((state) => ({
            tasks: completedTasks,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  setProfile: async (supabase, reset) => {
    if (reset) {
      set((state) => ({
        profile: null,
      }));
      return;
    }
    const { data: userData, error: userError } = await supabase.auth.getUser();

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

    if (data && !get().profile) {
      set((state) => ({
        profile: data,
      }));
    }
  },
}));

export const useSession = () => useGlobalStore((state) => state.session);
export const useSetSession = () => useGlobalStore((state) => state.setSession);
export const useTasks = () => useGlobalStore((state) => state.tasks);
export const useSetTasks = () => useGlobalStore((state) => state.setTasks);
export const useProfile = () => useGlobalStore((state) => state.profile);
export const useSetProfile = () => useGlobalStore((state) => state.setProfile);
