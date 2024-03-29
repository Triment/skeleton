import { useToggle } from '../provider/context';
import SidenavHeader from './header';
import SidenavItems from './items';
import css from './style.module.css';

const style = {
  mobilePosition: {
    left: 'left-0',
    right: 'right-0',
  },
  container: `pb-32 lg:pb-6`,
  close: `hidden lg:block lg:w-64 lg:z-auto`,
  open: `w-8/12 absolute z-40 sm:w-5/12 lg:hidden`,
  default: `bg-white h-screen overflow-y-auto top-0 lg:relative`,
};

export default function SideNavigation({
  mobilePosition,
}: {
  mobilePosition: string;
}) {
  const { open, ref } = useToggle();
  return (
    <aside
      ref={ref}
      className={`${style.default} ${
        (style.mobilePosition as any)[mobilePosition]
      } 
       ${open ? style.open : style.close} ${css.scrollbar}`}
    >
      <div className={style.container}>
        <SidenavHeader />
        <SidenavItems />
      </div>
    </aside>
  );
}
