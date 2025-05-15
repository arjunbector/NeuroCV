import { Metadata } from "next";
import ResumeEditor from "./resume-editor";

export const metadata: Metadata = {
  title: "Resume Editor",
};

export default function EditorPage() {
  return (
    <div className="flex h-full grow flex-col">
      <ResumeEditor />
    </div>
  );
}
