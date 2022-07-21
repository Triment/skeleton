import { NextPageContext } from 'next';
import { FC, useState } from 'react';
import { FolderIcon } from '../../../components/docs/icons';
import {
  EditBarType,
  ModalActiontype,
  withManger,
} from '../../../components/hoc/manger';
import { host } from '../../../config';
import { useModal } from '../../../dashboard/provider/modal';
import { Menu, Role } from '../../../database/model';

const RoleManger: FC<{ roles: Role[]; menus: Menu[] }> = ({ roles, menus }) => {
  const TableData: Role[] = roles;
  const { show } = useModal();
  const [role, setCurrentRole] = useState<Role>();
  const ActionBars: EditBarType[] = [
    {
      title: '新建',
      icon: FolderIcon,
      action: () => {
        show();
      },
    },
  ];
  const SelectItemAction = (role: Role) => {};
  const ModalComponent = () => <></>;
  return withManger<Role>({
    ActionBars,
    TableData,
    ModalComponent,
    SelectItemAction,
  });
};

export default RoleManger;

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
