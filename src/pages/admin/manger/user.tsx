import { host } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../../dashboard/provider/modal';
import { PortalModal } from '../../../util/Portal';
import { createContext, useContext, useEffect, useState } from 'react';
import { Input, Select, SelectDataType } from '../../../components/input';
import { CheckBox } from '../../../components/checkbox';
import { Role, User } from '../../../database/model';
import { NextPageContext } from 'next';
import { UserType } from '../../../redux/userSlice';
import { AddIcon } from '../../../dashboard/sidenavigation/icons/add';

//用户信息修改卡片

type UserInfoType = {
  roles: SelectDataType[];
  user: UserType;
  setUser: (arg0: UserType) => void;
  submit: () => void;
  isCreate: boolean;
};
const UserInfo = ({ isCreate, roles, user, setUser, submit }: UserInfoType) => {
  return (
    <div className="shadow-lg bg-white rounded-2xl p-4 w-auto h-auto first:mt-4 last:mb-4">
      <Input
        className="my-4"
        label="用户名"
        type="text"
        onChange={(e) => {
          setUser({ ...user, username: e.currentTarget.value });
        }}
        value={user && user.username}
        placeholder={user && user.username}
      />
      <Input
        className="my-4"
        label="头像"
        type="text"
        onChange={(e) => {
          setUser({ ...user, avatar: e.currentTarget.value });
        }}
        value={user && user.avatar}
        placeholder={user && user.avatar}
      />
      <Input
        className="my-4"
        label="密码"
        type="text"
        onChange={(e) => {
          if (e.currentTarget.value.length > 0)
            setUser({ ...user, password: e.currentTarget.value });
        }}
        placeholder="不修改就不写"
      />
      <Select
        data={roles}
        className="my-4 "
        label="角色"
        value={user && user.role!}
        click={(role) => setUser({ ...user, role: role } as UserType)}
      />
      <CheckBox
        enable={user && user.active}
        label="激活"
        click={(e) => setUser({ ...user, active: e })}
      />

      <Input
        className="my-4"
        label="email"
        type="text"
        onChange={(e) => {
          setUser({ ...user, email: e.currentTarget.value });
        }}
        value={user && user.email}
        placeholder={user && user.email}
      />
      <div className="flex justify-between">
        <div
          onClick={submit}
          className="cursor-pointer pointer-events-auto m-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-indigo-500"
        >
          {isCreate ? '创建' : '修改'}
        </div>
        <div
          onClick={(e) => {
            fetch(`${host.api}/user/delete`, {
              method: 'POST',
              body: JSON.stringify({ id: user.id }),
            });
          }}
          className={`${
            isCreate ? 'hidden' : ''
          } cursor-pointer pointer-events-auto m-8 rounded-md bg-red-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-red-500`}
        >
          删除
        </div>
      </div>

      {/* <Input label="角色" type="text" value={user.role} placeholder={user.role} /> */}
    </div>
  );
};

export default function MangerUser({
  users,
  roles,
}: {
  users: UserType[];
  roles: Role[];
}) {
  const { show } = useModal();
  const [currentUser, setUser] = useState<UserType>();
  const [isCreate, setCreate] = useState(false);
  const modify = async () => {
    console.log(currentUser);
    const res = await fetch(`${host.api}/user/update`, {
      method: 'POST',
      body: JSON.stringify(currentUser),
    });
  };
  const create = async () => {
    console.log(currentUser);
    const res = await fetch(`${host.api}/user/create`, {
      method: 'POST',
      body: JSON.stringify(currentUser),
    });
  };
  return (
    <div className="p-4 overflow-hidden">
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
        <UserInfo
          isCreate={isCreate}
          roles={roles}
          user={currentUser!}
          setUser={setUser}
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
                用户
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                角色
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                激活
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {users.map((item, i) => (
              <tr key={i}>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  {item.id}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center pr-8">
                    <img
                      alt={item.username}
                      src={item.avatar}
                      className="h-10 w-10 flex-none rounded-full"
                    />
                    <div className="ml-2 flex-auto">
                      <div className="font-medium">{item.username}</div>
                      <div className="text-slate-700">{item.email}</div>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  {item.role.raw}
                </td>
                <td className="whitespace-nowrap border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  {item.active ? (
                    <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-700 bg-green-50">
                      激活
                    </span>
                  ) : (
                    <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-red-700 bg-red-50">
                      失效
                    </span>
                  )}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  <FontAwesomeIcon
                    onClick={() => {
                      setCreate(false);
                      setUser(item);
                      show();
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
  const users: User[] = await (await fetch(`${host.api}/user/all`)).json(); //获取用户
  const roles: Role[] = await (await fetch(`${host.api}/auth/role/all`)).json(); //获取角色
  return {
    props: {
      users: users,
      roles: roles,
    },
  };
};
