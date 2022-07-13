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

//用户信息修改卡片

type RoleInfoType = {
  menus: Menu[];
  role: RoleType;
  setRole: (arg0: RoleType) => void;
  submit: ()=>void;
};
const RoleInfo = ({ menus, role, setRole, submit }: RoleInfoType) => {
  if (!role) return null;
  return (
    <div className="shadow-lg bg-white rounded-2xl p-4 w-auto h-auto first:mt-4 last:mb-4">
      <Input
        className="my-4"
        label="名称"
        type="text"
        onChange={(e) => {
          setRole({...role, raw: e.currentTarget.value});
        }}
        value={role.raw}
        placeholder={role.raw}
      />
      <Input
        className="mt-4"
        label="带宽kb/s"
        type="text"
        onChange={(e) => {
          setRole({ ...role, bandwidth: parseInt(e.currentTarget.value)});
        }}
        value={role.bandwidth}
      />
      <div className="flex justify-between">
        <div
        onClick={submit}
        className="cursor-pointer pointer-events-auto m-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-indigo-500">
          修改
        </div>
        <div className="cursor-pointer pointer-events-auto m-8 rounded-md bg-red-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-red-500">
          删除
        </div>
      </div>

      {/* <Input label="角色" type="text" value={user.role} placeholder={user.role} /> */}
    </div>
  );
};

export default function MangerRole
({
  roles
}: {
  roles: Role[];
}) {
  const { show } = useModal();
  const [currentRole, setRole] = useState<RoleType>();
  const submit = async()=>{
    const res = await fetch(`${host.api}/user/update`, {
      method: 'POST',
      body: JSON.stringify(currentRole)
    })
  }
  return (
    <div className="shadow-sm rounded-2xl w-min p-4 bg-white overflow-hidden my-8">
      <PortalModal>
        <RoleInfo 
        menus={[]}
        role={currentRole!} 
        setRole={setRole}
        submit={submit}
         />
      </PortalModal>
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
        <tbody className="bg-white dark:bg-slate-800">
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
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const roles: Role[] = await (await fetch(`${host.api}/auth/role/all`)).json(); //获取角色
  return {
    props: {
      roles: roles,
    },
  };
};
