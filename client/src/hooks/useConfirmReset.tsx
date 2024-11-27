import { useState } from "react";
import { UseConfirmResetReturn } from "../types/types";

const useConfirmReset = (onReset: () => void): UseConfirmResetReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");

  const openModal = (): void => setIsModalOpen(true);

  const closeModal = (): void => {
    setIsModalOpen(false);
    setConfirmText("");
  };

  const handleConfirm = (): void => {
    if (confirmText === "Reset Form") {
      onReset();
      closeModal();
    }
  };

  const isConfirmEnabled: boolean = confirmText === "Reset Form";

  return {
    isModalOpen,
    confirmText,
    isConfirmEnabled,
    openModal,
    closeModal,
    setConfirmText,
    handleConfirm,
  };
};

export default useConfirmReset;
