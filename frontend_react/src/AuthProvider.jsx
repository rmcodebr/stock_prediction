import React, { useState, useContext, createContext } from "react";

// Create Context
const AuthContext = createContext();

const authProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken") // !! true or false
  );
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default authProvider;
export { AuthContext };
