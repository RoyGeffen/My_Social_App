import { ReactNode } from "react";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

interface AuthContextValue {
  currentUser: User | null;
  login: () => void;
}

declare module "*.d.ts" {
  import { ReactNode } from "react";
  export const AuthContext: React.Context<AuthContextValue>;
  export const AuthContextProvider: React.FC<{ children: ReactNode }>;
}
