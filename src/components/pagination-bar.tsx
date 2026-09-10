import type { ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

export type PaginationControl = {
  page: number;
  disabled: boolean;
  text: string;
};

export function PaginationBar({
  page,
  size,
  total,
  renderPrevious,
  renderNext,
}: {
  page: number;
  size: number;
  total: number;
  renderPrevious: (control: PaginationControl) => ReactNode;
  renderNext: (control: PaginationControl) => ReactNode;
}) {
  const pageCount = Math.max(1, Math.ceil(total / size));

  if (pageCount <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {renderPrevious({
            page: page - 1,
            disabled: page <= 0,
            text: "Précédent",
          })}
        </PaginationItem>

        <PaginationItem className="px-3 text-sm text-muted-foreground">
          Page {page + 1} sur {pageCount}
        </PaginationItem>

        <PaginationItem>
          {renderNext({
            page: page + 1,
            disabled: page >= pageCount - 1,
            text: "Suivant",
          })}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
