import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { revalidateLogic } from "@tanstack/react-form";
import { useAppForm } from "@/components/form/app-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useAuth } from "@/features/auth/AuthContext";
import { createMovieCommentMutation } from "@/features/movies/queries";
import { commentCreateSchema } from "@/features/movies/schemas";

export function MovieCommentForm({
  movieId,
  onCreated,
}: {
  movieId: string;
  onCreated: () => void;
}) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const create = useMutation({
    ...createMovieCommentMutation(movieId),
    // Le préfixe couvre toutes les pages du fil, quelle que soit leur search.
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["movies", "detail", movieId, "comments"],
      }),
  });

  const form = useAppForm({
    defaultValues: { title: "", content: "" },
    // Validation au 1er envoi, puis à chaque frappe. Pas de validation au blur :
    // le schéma porte sur tout le formulaire, valider au blur d'un champ marquerait
    // en erreur ceux pas encore remplis (ex. la confirmation du mot de passe).
    validationLogic: revalidateLogic(),
    validators: { onDynamic: commentCreateSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        await create.mutateAsync(value);
        formApi.reset();
        onCreated();
      } catch {
        // `handleSubmit` relaie l'erreur du `onSubmit`. Sans ce `catch` elle
        // finirait en rejet non géré, le `onSubmit` du `<form>` n'attendant
        // pas la promesse. Elle reste lisible via `create.isError`.
      }
    },
  });

  if (!isAuthenticated) {
    return (
      <p className="text-sm text-muted-foreground">
        <Link
          to="/login"
          search={{ redirect: `/movies/${movieId}` }}
          className="underline underline-offset-4"
        >
          Connectez-vous
        </Link>{" "}
        pour laisser un commentaire.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Laisser un commentaire</CardTitle>
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
              name="title"
              children={(field) => <field.TextField label="Titre" />}
            />

            <form.AppField
              name="content"
              children={(field) => (
                <field.TextAreaField
                  label="Votre avis"
                  rows={4}
                  placeholder="Ce que vous avez pensé du film…"
                />
              )}
            />

            {create.isError && (
              <p className="text-sm text-destructive">
                L'envoi du commentaire a échoué, réessayez.
              </p>
            )}

            <form.AppForm>
              <form.SubmitButton pendingLabel="Envoi…">
                Publier
              </form.SubmitButton>
            </form.AppForm>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
