import { createContext } from "react";

type AuthContextType = {
  userState: {
    isLogged: boolean;
    userid: string | null;
  };
  setUserState: React.Dispatch<
    React.SetStateAction<{
      isLogged: boolean;
      userid: string | null;
    }>
  >;
};

const AuthContext = createContext<AuthContextType>({
  userState: {
    isLogged: false,
    userid: null,
  },
  setUserState: () => {},
});

export default AuthContext;