export type User = {
    id: number;
    name: string;
    profilePic: string;
  }
export type LoginInput = {
    username:string,
    password:string
  }
export interface AuthContextValue {
    currentUser: User | null;
    login: (inputs: LoginInput) => void;
  }
  