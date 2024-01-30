export type AuthContextType = {
  loggedIn: authObject;
  saveAuth: (id: string) => void;
  handleLogout: () => void;
};

export interface authObject {
  loggedIn: boolean;
  userId: string;
}

export interface workoutObject {
  workout: string;
  length: string;
  instructions: [string];
}

export interface currentWorkoutObject {
  workout: string;
  instructions: [string];
}
