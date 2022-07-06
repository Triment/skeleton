import React, { MutableRefObject } from 'react';

// 创建上下文

interface TypeModalContext {
  modalOpen: boolean,
  refOfModal: MutableRefObject<null>,
  show: () => void,
  ChildElement: undefined,
  setModal: (child: any) => void
}

const Context = React.createContext<TypeModalContext | null>(null);

const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalOpen, setOpen] = React.useState(false);
  const [ChildElement, setChild] = React.useState();
  const refOfModal = React.useRef(null);

  const show = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [modalOpen, refOfModal]);
  const setModal = (child: any) => setChild(child);
  return (
    <Context.Provider
      value={{ modalOpen, refOfModal, show, ChildElement, setModal }}
    >
      {children}
    </Context.Provider>
  );
}
export default ModelProvider
export function useModal():TypeModalContext {
  return React.useContext(Context) as TypeModalContext;
}
