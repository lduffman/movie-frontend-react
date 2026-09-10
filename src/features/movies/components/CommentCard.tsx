import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";
import type { Comment } from "../schemas";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

export function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <span className="text-sm font-medium">{comment.title}</span>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center">
        <div className="relative px-6">
          <QuoteIcon className="absolute -left-1 -top-1 h-5 w-5 -scale-x-100 text-muted-foreground/40" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            {comment.content}
          </p>

          <QuoteIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-muted-foreground/40" />
        </div>

        <div className="mt-5 flex items-baseline justify-end gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{comment.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={comment.createdAt}>
            {dateFormatter.format(new Date(comment.createdAt))}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}
