import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const schema = Yup.object({
  email: Yup.string()
    .email("Email invalide")
    .required("Veuillez entrer votre email"),
});

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    toast.success(`Un lien de réinitialisation a été envoyé à ${data.email}`);
  };

  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-md shadow-md text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Mot de passe oublié ?</h2>
      <p className="text-sm text-gray-300 mb-6 text-center">
        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700 transition duration-300"
        >
          Envoyer
        </button>

        <div className="text-center text-sm mt-4">
          <Link to="/" className="text-blue-400 hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
