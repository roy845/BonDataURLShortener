import { useState } from "react";
import { CopyStatus, UseCopyToClipboardReturn } from "../types/types";
import { toast } from "react-toastify";

const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("success");
      toast.success("Link copied to clipboard!");
    } catch {
      setCopyStatus("error");
      toast.error("Failed to copy link.");
    }

    setTimeout(() => setCopyStatus(null), 2000);
  };

  return { copyStatus, copyToClipboard };
};

export default useCopyToClipboard;
