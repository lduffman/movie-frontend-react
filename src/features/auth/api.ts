import { api } from "@/lib/api";
import type { LoginForm, RegisterForm, TokenResponse, User } from "./schemas";

/**`POST /auth/register` */
export async function registerUser(form: RegisterForm): Promise<User> {
  const { data } = await api.post<User>("/auth/register", {
    username: form.username,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
  });
  return data;
}

/** `POST /auth/login */
export async function loginUser(form: LoginForm): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>("/auth/login", {
    username: form.username,
    password: form.password,
  });
  return data;
}
