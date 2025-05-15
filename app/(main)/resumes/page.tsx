import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Resumes",
};

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquareIcon className="size-5" />
          New Resume
        </Link>
      </Button>
    </main>
  );
}
