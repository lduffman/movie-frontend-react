import { z } from "zod";

const passwordPattern = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,}$`;

export const registerFormSchema = z
  .object({
    username: z.email().min(1, { message: "Le nom d'utilisateur est requis" }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .regex(new RegExp(passwordPattern), {
        message:
          "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "La confirmation du mot de passe est requise" }),
    firstName: z.string().min(1, { message: "Le prénom est requis" }).max(255),
    lastName: z.string().min(1, { message: "Le nom est requis" }).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  username: z.email().min(1, { message: "Le nom d'utilisateur est requis" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
});

export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number().int(),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type RegisterForm = z.infer<typeof registerFormSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
export type User = z.infer<typeof userSchema>;
