import React, { FC, useState } from 'react';
import { useModal } from '../../dashboard/provider/modal';
import { PortalModal } from '../../util/Portal';

export type EditBarType = {
  title: string; //标题
  icon: React.FC<React.ComponentProps<'svg'>>; //图标
  action: () => void; //按钮动作
};
//actions的类型
export type ModalActiontype<T> = {
  data: T; //当前的数据
  actions: { action: () => void; title: string }[]; //动作
  message: string; //提示
};

type MangerHOCProps<T> = {
  ActionBars: EditBarType[];
  TableData: T[];
  ModalComponent: FC;
  SelectItemAction: (arg0: T) => void;
};

export function withManger<T>({
  ActionBars,
  TableData,
  ModalComponent,
  SelectItemAction,
}: MangerHOCProps<T>) {
  return (
    <div className="p-4 overflow-hidden">
      <PortalModal>
        <ModalComponent />
      </PortalModal>
      {/* 操作按钮列表 */}
      <div className="flex justify-start my-4 ">
        {
          //按钮样式在这里包装
          ActionBars.map((item, i) => {
            return (
              <div
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  item.action();
                }}
                className="flex flex-col bg-white p-2 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer"
              >
                <item.icon />
                <p className="text-xs">{item.title}</p>
              </div>
            );
          })
        }
      </div>
      <div className="shadow-sm rounded-2xl bg-white py-4 w-fit">
        <table className="border-collapse table-auto text-sm">
          <thead>
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap">
                选择
              </th>
              {
                //表头
                TableData.length > 0
                  ? Array.from(Object.keys(TableData[0])).map((ele, k) => {
                      return typeof (TableData[0] as any)[ele] !== 'object' ? (
                        <th
                          key={k}
                          className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 text-slate-400 dark:text-slate-200 text-left whitespace-nowrap"
                        >
                          {ele}
                        </th>
                      ) : null;
                    })
                  : null
              }
            </tr>
          </thead>
          <tbody className="dark:bg-slate-800">
            {
              //表数据
              TableData.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input
                        onClick={() => SelectItemAction(item)}
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                    {Array.from(Object.keys(item)).map((ele, k) => {
                      return typeof (item as any)[ele] !== 'object' ? (
                        <td
                          key={k}
                          className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                        >
                          {(item as any)[ele]}
                        </td>
                      ) : null;
                    })}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

type Action<T> = {
  type: string;
  value: T;
};

function reducer<T>(state: T, action: Action<T>): T {
  switch (action.type) {
    case 'CHANGE':
      state = action.value;
      break;
    default:
      break;
  }
  return state;
}

function createState<T>(state: T) {
  let s = state;
  const getState = () => s;
  const dispatch = (action: Action<T>) => {
    s = reducer<T>(s, action);
  };
  return {
    getState,
    dispatch,
  };
}
