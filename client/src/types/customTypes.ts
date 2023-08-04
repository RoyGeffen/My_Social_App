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

export type Post ={
    id:number,
    name:string,
    userId:number,
    createdAt: Date,
    profilePic?:string,
    desc?:string,
    img?:string
  }

  
  