import { createLink } from "@tanstack/react-router";
import { PaginationBar } from "@/components/pagination-bar";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PreviousLink = createLink(PaginationPrevious);
const NextLink = createLink(PaginationNext);

export function LibraryPagination({
  page,
  size,
  total,
}: {
  page: number;
  size: number;
  total: number;
}) {
  return (
    <PaginationBar
      page={page}
      size={size}
      total={total}
      renderPrevious={(control) => (
        <PreviousLink
          from="/me/library"
          to="/me/library"
          search={(prev) => ({ ...prev, page: control.page })}
          disabled={control.disabled}
          text={control.text}
        />
      )}
      renderNext={(control) => (
        <NextLink
          from="/me/library"
          to="/me/library"
          search={(prev) => ({ ...prev, page: control.page })}
          disabled={control.disabled}
          text={control.text}
        />
      )}
    />
  );
}
