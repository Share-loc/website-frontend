import { createContext } from "react";

type AuthContextType = {
  userState: {
    isLogged: boolean;
  };
  setUserState: React.Dispatch<
    React.SetStateAction<{
      isLogged: boolean;
    }>
  >;
};

const AuthContext = createContext<AuthContextType>({
  userState: {
    isLogged: false,
  },
  setUserState: () => {},
});

export default AuthContext;