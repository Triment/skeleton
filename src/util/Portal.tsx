import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '../dashboard/provider/modal';

export const PortalModal = ({ children }: { children: ReactNode }) => {
  const { refOfModal, show } = useModal();
  useEffect(() => {
    if (!!refOfModal.current)
      (refOfModal.current! as HTMLDivElement).click = () => show();
  }, [refOfModal, show]);
  return refOfModal != undefined && refOfModal.current != null
    ? ReactDOM.createPortal(children, refOfModal.current)
    : null;
};
