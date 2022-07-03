import React from 'react';

// 创建上下文
const Context = React.createContext({});

export default function ModelProvider({ children }) {
  const [modalOpen, setOpen] = React.useState(false);
  const [ChildElement, setChild] = React.useState();
  const refOfModal = React.useRef(null);

  const show = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [modalOpen, refOfModal]);
  const setModal = (child) => setChild(child);
  return (
    <Context.Provider
      value={{ modalOpen, refOfModal, show, ChildElement, setModal }}
    >
      {children}
    </Context.Provider>
  );
}

// custom hook to consume all context values { open, ref, toggle }
export function useModal() {
  return React.useContext(Context);
}
