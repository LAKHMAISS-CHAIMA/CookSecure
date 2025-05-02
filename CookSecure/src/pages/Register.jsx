import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validators/ConnectValidation";
import { createUser } from "../services/api";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    await createUser(data);
    toast.success("Compte créé !");
    navigate("/");
  };

  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Créer un compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nom d'utilisateur</label>
          <input
            {...register("username")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded"
          />
          {errors.username && <p className="text-red-400">{errors.username.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            {...register("email")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded"
          />
          {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded"
          />
          {errors.password && <p className="text-red-400">{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirmer mot de passe</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded"
          />
          {errors.confirmPassword && <p className="text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <label>Rôle</label>
          <select
            {...register("role")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded"
          >
            <option value="utilisateur">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700"
        >
          Register
        </button>

        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
