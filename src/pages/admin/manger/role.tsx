import { host } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../../dashboard/provider/modal';
import { PortalModal } from '../../../util/Portal';
import { createContext, useContext, useEffect, useState } from 'react';
import { Input, Select, SelectDataType } from '../../../components/input';
import { CheckBox } from '../../../components/checkbox';
import { Menu, Role, User } from '../../../database/model';
import { NextPageContext } from 'next';
import { RoleType } from '../../../redux/userSlice';
import { InsertValuesMissingError } from 'typeorm';
import { AddIcon } from '../../../dashboard/sidenavigation/icons/add';

//用户信息修改卡片

type RoleInfoType = {
  menus: Menu[];
  role: RoleType;
  setRole: (arg0: RoleType) => void;
  submit: () => void;
  isCreate: boolean;
};
const RoleInfo = ({ isCreate, menus, role, setRole, submit }: RoleInfoType) => {
  //if (!role) return null;
  return (
    <div
      onClick={(e) => e.preventDefault()}
      className="shadow-lg bg-white rounded-2xl p-4 w-auto h-auto first:mt-4 last:mb-4"
    >
      <Input
        className="my-4"
        label="名称"
        type="text"
        onChange={(e) => {
          setRole({ ...role, raw: e.currentTarget.value });
        }}
        value={role && role.raw}
        placeholder={role && role.raw}
      />
      <Input
        className="my-4 py-2"
        label="带宽kb/s"
        type="text"
        onChange={(e) => {
          setRole({ ...role, bandwidth: parseInt(e.currentTarget.value) });
        }}
        value={role && role.bandwidth}
      />
      <ul>
        {menus.map((item) => {
          const includeItem =
            role && role.menus && role.menus.some((v) => v.link === item.link);
          return (
            <li
              key={item.id}
              className="flex items-center text-gray-600 dark:text-gray-200 justify-between py-3 border-b-2 border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-start text-sm">
                <span className={`${includeItem ? '' : 'line-through'} mx-4`}>
                  {item.title}
                </span>
                <span className={includeItem ? '' : 'line-through'}>
                  {item.link}
                </span>
              </div>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                onClick={() => {
                  //delete
                  console.log(role);
                  if (includeItem) {
                    //删除菜单
                    const menustmp = role.menus.filter(
                      (i) => i.link != item.link,
                    );
                    setRole({ ...role, menus: menustmp });
                  } else {
                    setRole({
                      ...role,
                      menus:
                        role && role.menus ? [...role.menus, item] : [item],
                    });
                  }
                  //push
                }}
                className={`mx-4 ${
                  includeItem ? 'text-green-500' : 'text-gray-500'
                } cursor-pointer hover:text-green-300 dark:text-gray-300`}
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                  fill="currentColor"
                />
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                  fill="currentColor"
                />
              </svg>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between">
        <div
          onClick={submit}
          className="cursor-pointer pointer-events-auto m-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-indigo-500"
        >
          {isCreate ? '创建' : '修改'}
        </div>
        <div
          onClick={(e) => {
            fetch(`${host.api}/permission/role/delete`, {
              method: 'POST',
              body: JSON.stringify({ id: role.id }),
            });
          }}
          className="cursor-pointer pointer-events-auto m-8 rounded-md bg-red-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-red-500"
        >
          删除
        </div>
      </div>

      {/* <Input label="角色" type="text" value={user.role} placeholder={user.role} /> */}
    </div>
  );
};

export default function MangerRole({
  menus,
  roles,
}: {
  roles: Role[];
  menus: Menu[];
}) {
  const { show } = useModal();
  const [currentRole, setRole] = useState<RoleType>();
  const [isCreate, setCreate] = useState(false);
  const modify = async () => {
    const res = await fetch(`${host.api}/permission/role/update`, {
      method: 'POST',
      body: JSON.stringify(currentRole),
    });
  };
  const create = async () => {
    const res = await fetch(`${host.api}/permission/role/create`, {
      method: 'POST',
      body: JSON.stringify(currentRole),
    });
  };
  return (
    <div className=" p-4 overflow-hidden ">
      <div className="flex justify-between my-4 ">
        <AddIcon
          onClick={(e) => {
            e.preventDefault();
            setCreate(true);
            show();
          }}
          className="text-green-500 bg-white shadow-sm rounded-2xl p-1 hover:text-green-400 cursor-pointer"
        />
      </div>
      <PortalModal>
        <RoleInfo
          isCreate={isCreate}
          menus={menus}
          role={currentRole!}
          setRole={setRole}
          submit={isCreate ? create : modify}
        />
      </PortalModal>
      <div className="shadow-sm rounded-2xl bg-white py-4 w-fit">
        <table className="border-collapse table-auto text-sm">
          <thead>
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                id
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                角色
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                带宽
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="rounded-2xl bg-white dark:bg-slate-800">
            {roles.map((item, i) => (
              <tr key={i}>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {item.id}
                </td>

                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  {item.raw}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  {item.bandwidth}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  <FontAwesomeIcon
                    onClick={() => {
                      setCreate(false); //从创建设置回编辑状态
                      show();
                      setRole(item);
                    }}
                    className="text-blue-700 hover:text-blue-500 cursor-pointer ease-in duration-300"
                    icon={faPenToSquare}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const roles: Role[] = await (await fetch(`${host.api}/auth/role/all`)).json(); //获取角色
  const menus: Menu[] = await (await fetch(`${host.api}/auth/getmenu`)).json();
  return {
    props: {
      roles: roles,
      menus: menus,
    },
  };
};
