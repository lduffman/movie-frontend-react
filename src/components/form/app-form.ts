import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SubmitButton } from "./submit-button";
import { TextAreaField } from "./textarea-field";
import { TextField } from "./text-field";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextAreaField },
  formComponents: { SubmitButton },
});
