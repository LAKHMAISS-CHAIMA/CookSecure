import * as yup from "yup";

const connectValidation = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().required("Mot de passe requis"),
});

export default connectValidation;
