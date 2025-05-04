import * as yup from "yup";

const userSchema = yup.object().shape({
  username: yup.string().required("Nom d'utilisateur requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().min(6, "Min 6 caractères").required("Mot de passe requis"),
});

export default userSchema;
