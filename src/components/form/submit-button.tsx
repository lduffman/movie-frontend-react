import { createFormHookContexts } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";

const { useFormContext } = createFormHookContexts();

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel: string;
};

export function SubmitButton({ children, pendingLabel }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? pendingLabel : children}
        </Button>
      )}
    </form.Subscribe>
  );
}
