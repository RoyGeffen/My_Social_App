export type User = {
    id: number;
    name: string;
    profilePic: string;
    coverPic?: string;
    city?:string;
    websites?:UserLinks;
    email?:string;
    username?:string;
  }
export type UserLinks={
  id?:number;
  facebook?:string;
  instagram?:string;
  twitter?:string;
  linkedIn?:string;
  pinterest?:string;
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
    userid:number,
    createdAt: Date,
    profilePic?:string,
    desc?:string,
    img?:string
  }

  export type Comment = {
    id: number;
    desc: string;
    name: string;
    userId: number;
    profilePic: string;
    createdAt: Date;
  }
  
  export type NewComment={
    desc:string,
    postId: number
  }
  
  
  