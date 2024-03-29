import { useRouter } from 'next/router';
import React, { MutableRefObject } from 'react';

// create new context

interface TypeContext {
  open: boolean;
  ref: MutableRefObject<null>;
  toggle: () => void;
}

const Context = React.createContext<TypeContext | null>(null);

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const router = useRouter();

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // set the html tag style overflow to hidden
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
  }, []);

  // close side navigation on mobile when route changes. it's triggered when viewport is less than 1024px
  React.useEffect(() => {
    if (open && window.innerWidth < 1024) {
      router.events.on('routeChangeStart', () => setOpen(false));
    }

    return () => {
      if (open && window.innerWidth < 1024) {
        router.events.off('routeChangeStart', () => setOpen(false));
      }
    };
  }, [open, router]);

  // close side navigation on click outside when viewport is less than 1024px
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (open && window.innerWidth < 1024) {
        // if (!ref.current?.contains(event.target)) {
        if (!open) return;
        setOpen(true);
        //}
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [open, ref]);

  return (
    <Context.Provider value={{ open, ref, toggle }}>
      {children}
    </Context.Provider>
  );
};

export default DashboardProvider;

// custom hook to consume all context values { open, ref, toggle }
export function useToggle(): TypeContext {
  return React.useContext(Context) as TypeContext;
}
