import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { host } from '../../config';

import data from './data';
import FolderIcon from './icons/folder';

const style = {
  title: `font-normal mx-4 text-sm`,
  active: `bg-gradient-to-r border-r-4 border-blue-500 border-r-4 border-blue-500 from-white to-blue-100 text-blue-500`,
  link: `duration-200 flex font-thin items-center justify-start my-2 p-4 transition-colors text-gray-500 uppercase w-full lg:hover:text-blue-500`,
};

export default function SidenavItems() {
  const { asPath } = useRouter();
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    if (menus.length === 0)
      (async () => {
        await fetch(`${host.api}/auth/getmenu`)
          .then((res) => res.json())
          .then((data) => {
            setMenus(data);
          });
      })();
  }, [menus]);
  return (
    <ul>
      <li>
        {menus.map((item) => (
          <Link href={item.link} key={item.title}>
            <a
              className={`${style.link} 
              ${item.link === asPath && style.active}`}
            >
              <span>
                <FolderIcon />
              </span>
              <span className={style.title}>{item.title}</span>
            </a>
          </Link>
        ))}
      </li>
    </ul>
  );
}
