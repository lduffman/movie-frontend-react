import { EyeIcon, EyeOffIcon, StarIcon } from "lucide-react";
import type { LibraryEntry } from "@/features/library/schemas";

export function LibraryEntryStatus({ entry }: { entry: LibraryEntry }) {
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        {entry.watched ? (
          <>
            <EyeIcon className="size-3.5" /> Vu
          </>
        ) : (
          <>
            <EyeOffIcon className="size-3.5" /> À voir
          </>
        )}
      </span>
      {entry.rating !== null && (
        <span className="flex items-center gap-1 font-medium text-foreground">
          <StarIcon
            className="size-3.5"
            style={{ color: "#e4c616", fill: "#e4c616" }}
          />
          {entry.rating.toFixed(1)}/10
        </span>
      )}
    </div>
  );
}
