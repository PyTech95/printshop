import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null=checking, false=guest, obj=authed
  const [token, setToken] = useState(() => localStorage.getItem("ml_token") || "");

  useEffect(() => {
    const check = async () => {
      if (!token) { setUser(false); return; }
      try {
        const { data } = await axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        setUser(data);
      } catch {
        localStorage.removeItem("ml_token");
        setToken("");
        setUser(false);
      }
    };
    check();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("ml_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("ml_token");
    setToken("");
    setUser(false);
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
