import * as Yup from 'yup';

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .required("Le nom d'utilisateur est requis"),

  email: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),

  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Le mot de passe est requis'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe est requise'),

  role: Yup.string()
    .oneOf(['admin', 'utilisateur'], 'Choisissez un rôle valide')
    .required('Le rôle est requis'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("L'email est invalide")
    .required("L'email est requis"),

  password: Yup.string()
    .required('Le mot de passe est requis'),
});
