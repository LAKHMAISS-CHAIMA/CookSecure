import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  const loginUser = async (credentials) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      if (user) {
        setCurrentUser(user); 
        localStorage.setItem("currentUser", JSON.stringify(user)); 
        return user;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const registerUser = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.some((u) => u.email === userData.email);
      if (exists) return false;
      const newUser = { ...userData, role: "utilisateur" };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
