import { createContext } from "react";
import { User } from "../types";

interface MyContext {
  user: User | null;
  // setUser: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
}

export const UserContext = createContext<MyContext>({
  user: null,
  setUser: null,
});
