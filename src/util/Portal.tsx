import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '../dashboard/provider/model';

export const PortalModal = ({ children }: {children: ReactNode}) => {
  const { refOfModal, show } = useModal();
  useEffect(() => {
    (refOfModal.current! as HTMLDivElement).click = () => show();
  }, [refOfModal]);
  return refOfModal != undefined && refOfModal.current != null
    ? ReactDOM.createPortal(children, refOfModal.current)
    : null;
};
