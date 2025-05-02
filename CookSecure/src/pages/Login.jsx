import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validators/ConnectValidation";
import { getUsers } from "../services/api";
import { loginUser } from "../services/authService";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    const users = await getUsers();
    const found = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (found) {
      loginUser(found);
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(found));
      }
      toast.success("Bienvenue " + found.username);
      navigate("/home");
    } else {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Se connecter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded focus:outline-none"
          />
          {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded focus:outline-none"
          />
          {errors.password && <p className="text-red-400">{errors.password.message}</p>}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-300">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"className="w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700">Login</button>

        <div className="text-center mt-4 text-sm">
          New here?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
