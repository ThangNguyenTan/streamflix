import { useState } from "react";
import { AuthContext, type User } from "./types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    // Simulate API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: "1",
          username: "JohnDoe",
          email,
        });
        localStorage.setItem("auth", "true");
        resolve();
      }, 1000);
    });
  };

  const signup = async (
    username: string,
    email: string,
    _password: string
  ) => {
    // Simulate API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: "1",
          username,
          email,
        });
        localStorage.setItem("auth", "true");
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
