import React, { createContext, useState, useContext } from 'react';
import { useRouter } from "next/router";

// Create the context
const UserContext = createContext();

// Provide the context to the app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Only store the username
    const [showPopup, setShowPopup] = useState(false); 
    const router = useRouter();
  
    const login = (userData) => {
      setUser(userData.username); // Store only the username in state
      localStorage.setItem("loggedInUser", userData.username); // Store only the username in localStorage
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("loggedInUser");
      router.push('/login');
    };

    const updatePopup = (state) => {
      setShowPopup(state);
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout, showPopup, updatePopup }}>
        {children}
      </UserContext.Provider>
    );
};

// Custom hook for using UserContext
export const useUser = () => useContext(UserContext);
