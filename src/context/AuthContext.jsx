import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Sign Up as new user with email and password
  const signUp = (email, password) => {
    //Signs up a new user automatically creates a database in the firestore
    createUserWithEmailAndPassword(auth, email, password);
    // Creates new user
    return setDoc(doc(db, "users", email), {
      // We store the selected coins in the empty array
      watchList: [],
    });
  };

  // Signs in the user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Signs the user out
  const logout = () => {
    return signOut(auth);
  };

  // Checks if the user is authenticated or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []); /* Add dependency array to run only once*/

  return (
    <UserContext.Provider value={{ signUp, signIn, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
