import { useForm } from "react-hook-form";
import { useAuth } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import connectValidation from "../validators/connectValidation";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(connectValidation),
  });

  const onSubmit = async (data) => {
    const user = await loginUser(data);
    if (user) {
      toast.success("Bienvenue !");
      navigate("/");
    } else {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>

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
          Se connecter
        </button>

        <div className="flex justify-between text-sm">
          <Link to="register" className="text-red-400 hover:underline">
            Créer un compte
          </Link>

          <Link to="/forgot-password" className="text-red-400 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
