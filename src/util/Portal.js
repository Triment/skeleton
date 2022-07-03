import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '../dashboard/provider/model';

export const PortalModal = ({ children }) => {
  const { refOfModal, show } = useModal();
  useEffect(() => {
    refOfModal.current.click = (e) => show();
  }, [refOfModal]);
  return refOfModal != undefined && refOfModal.current != null
    ? ReactDOM.createPortal(children, refOfModal.current)
    : null;
};
