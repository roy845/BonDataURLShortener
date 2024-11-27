import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectModal } from "../features/modalSlice";

const useAppInfoModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, doNotShowAgain } = useAppSelector(selectModal);

  return { isOpen, doNotShowAgain, dispatch };
};

export default useAppInfoModal;
