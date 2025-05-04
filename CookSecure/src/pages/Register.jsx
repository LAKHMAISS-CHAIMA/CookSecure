import { useForm } from "react-hook-form";
import { useAuth } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../validators/userSchema";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) {
      toast.success("Compte créé avec succès !");
      navigate("/connect");
    } else {
      toast.error("Cet email est déjà utilisé !");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>

      <input
        {...register("username")}
        placeholder="Nom d'utilisateur"
        className="border p-2 w-full mb-2 text-black"
      />
      <p className="text-red-500">{errors.username?.message}</p>

      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 w-full mb-2 text-black"
      />
      <p className="text-red-500">{errors.email?.message}</p>

      <input
        type="password"
        {...register("password")}
        placeholder="Mot de passe"
        className="border p-2 w-full mb-2 text-black"
      />
      <p className="text-red-500">{errors.password?.message}</p>

      <div className="flex flex-col space-y-2">
        <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600">
          S'inscrire
        </button>
        
        <p className="text-center">
          Déjà inscrit ? <Link to="/connect" className="text-red-400 hover:underline">Se connecter</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;