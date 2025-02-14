import { createContext } from "react";

type UserState = {
  isLogged: boolean;
  avatar?: string;
  username?: string;
}

type AuthContextType = {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const AuthContext = createContext<AuthContextType>({
  userState: { isLogged: false },
  setUserState: () => {},
});

export default AuthContext;