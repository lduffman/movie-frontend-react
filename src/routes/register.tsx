import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { revalidateLogic } from "@tanstack/react-form";
import { useAppForm } from "@/components/form/app-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { registerUser } from "@/features/auth/api";
import { DEFAULT_REDIRECT } from "@/features/auth/constants";
import { registerFormSchema } from "@/features/auth/schemas";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: DEFAULT_REDIRECT });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = Route.useNavigate();

  const register = useMutation({
    mutationFn: registerUser,
    // On redirige vers la page de connexion avec le nom d'utilisateur pré-rempli.
    onSuccess: (user) =>
      navigate({ to: "/login", search: { username: user.username } }),
  });

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    // Validation au 1er envoi, puis à chaque frappe. Pas de validation au blur :
    // le schéma porte sur tout le formulaire, valider au blur d'un champ marquerait
    // en erreur ceux pas encore remplis (ex. la confirmation du mot de passe).
    validationLogic: revalidateLogic(),
    validators: { onDynamic: registerFormSchema },
    onSubmit: async ({ value }) => {
      await register.mutateAsync(value);
    },
  });

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Vous vous connecterez juste après l'inscription.
        </CardDescription>
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
              name="firstName"
              children={(field) => (
                <field.TextField label="Prénom" autoComplete="given-name" />
              )}
            />

            <form.AppField
              name="lastName"
              children={(field) => (
                <field.TextField label="Nom" autoComplete="family-name" />
              )}
            />

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
                  autoComplete="new-password"
                />
              )}
            />

            <form.AppField
              name="confirmPassword"
              children={(field) => (
                <field.TextField
                  label="Confirmation du mot de passe"
                  type="password"
                  autoComplete="new-password"
                />
              )}
            />

            {register.isError && (
              <p className="text-sm text-destructive">
                {isAxiosError(register.error) &&
                register.error.response?.status === 409
                  ? "Un compte existe déjà avec cette adresse."
                  : "L'inscription a échoué, réessayez."}
              </p>
            )}

            <form.AppForm>
              <form.SubmitButton pendingLabel="Création…">
                Créer mon compte
              </form.SubmitButton>
            </form.AppForm>

            <p className="text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/login" className="underline hover:text-foreground">
                Se connecter
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
