import { useState } from "react";
import { ShortCode } from "../types/types";

const useShortCodeRow = (
  code: ShortCode,
  deleteShortCode: (short_code: string) => Promise<void>
) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");

  const confirmationKeyword = `Delete ${code.short_code}`;

  const handleDelete = async () => {
    if (confirmText === confirmationKeyword) {
      await deleteShortCode(code.short_code);
      setModalOpen(false);
      setConfirmText("");
    }
  };

  return {
    setModalOpen,
    isModalOpen,
    confirmText,
    confirmationKeyword,
    handleDelete,
    setConfirmText,
  };
};

export default useShortCodeRow;
