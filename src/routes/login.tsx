import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useAppForm } from "@/components/form/app-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { loginUser } from "@/features/auth/api";
import { useAuth } from "@/features/auth/AuthContext";
import { DEFAULT_REDIRECT } from "@/features/auth/constants";
import { loginFormSchema, loginSearchSchema } from "@/features/auth/schemas";

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context, search }) => {
    if (!context.auth.isAuthenticated) return;
    if (search.redirect) throw redirect({ href: search.redirect });
    throw redirect({ to: DEFAULT_REDIRECT });
  },
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const router = useRouter();
  const auth = useAuth();

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: async (token) => {
      auth.login(token.accessToken);
      await router.invalidate();
      await navigate({ href: search.redirect ?? DEFAULT_REDIRECT });
    },
  });

  const form = useAppForm({
    defaultValues: {
      username: search.username ?? "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
      onBlur: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value);
    },
  });

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Accédez à votre bibliothèque.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField
              name="username"
              children={(field) => (
                <field.TextField
                  label="Adresse e-mail"
                  type="email"
                  autoComplete="username"
                />
              )}
            />

            <form.AppField
              name="password"
              children={(field) => (
                <field.TextField
                  label="Mot de passe"
                  type="password"
                  autoComplete="current-password"
                />
              )}
            />

            {login.isError && (
              <p className="text-sm text-destructive">
                {isAxiosError(login.error) &&
                login.error.response?.status === 401
                  ? "Identifiants invalides."
                  : "La connexion a échoué, réessayez."}
              </p>
            )}

            <form.AppForm>
              <form.SubmitButton pendingLabel="Connexion…">
                Se connecter
              </form.SubmitButton>
            </form.AppForm>

            <p className="text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link to="/register" className="underline hover:text-foreground">
                S'inscrire
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
