import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    toast.success("Si un compte existe avec cet email, un lien de réinitialisation vous sera envoyé");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mot de passe oublié</h2>
      <p className="text-gray-300 mb-4">
        Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>

      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full mb-2 text-black"
      />
      <p className="text-red-500">{errors.email?.message}</p>

      <div className="flex flex-col space-y-2">
        <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600">
          Envoyer le lien
        </button>
        
        <p className="text-center">
          <Link to="/connect" className="text-red-400 hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;