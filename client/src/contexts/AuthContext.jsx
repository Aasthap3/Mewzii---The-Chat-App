import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || ""
  );

  const [isLogin, setIsLogin] = useState(!!user);

  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  const logout = () => {
    // Clear user from session storage
    sessionStorage.removeItem("user");
    // Reset state
    setUser("");
    setIsLogin(false);
  };

  const updateUser = (updatedUserData) => {
    // Update user state
    setUser(updatedUserData);
    // Update session storage
    sessionStorage.setItem("user", JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, setUser, setIsLogin, logout, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
