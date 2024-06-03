import { createContext } from "react";

type AuthContextType = {
  userState: {
    isLogged: boolean;
    username: string;
  };
  setUserState: React.Dispatch<
    React.SetStateAction<{
      isLogged: boolean;
      username: string;
    }>
  >;
};

const AuthContext = createContext<AuthContextType>({
  userState: {
    isLogged: false,
    username: "",
  },
  setUserState: () => {},
});

export default AuthContext;