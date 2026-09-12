import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubmitButton } from "./submit-button";
import { TextField } from "./text-field";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubmitButton },
});
