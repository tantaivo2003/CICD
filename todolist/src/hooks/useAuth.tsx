// src/hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../api/authApi";

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi(email, password);
      console.log("Login successful", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await registerApi(name, email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return {
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated,
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };
}
