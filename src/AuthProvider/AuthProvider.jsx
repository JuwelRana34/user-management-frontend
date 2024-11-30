import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Auth } from "../../firebase.config";

// Create a context for user information
export const UserContext = createContext();
const AuthProvider = ({ children }) => {
  const signin = (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password);
  };
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password);
  };

  const AuthInfo = {
    signin,
    signUp,
  };

  return (
    <UserContext.Provider value={AuthInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
