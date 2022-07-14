import React, { useEffect, useState } from 'react';
import { host } from '../config';
import { Role } from '../database/model';

export const Input: React.FC<
  { label: string } & React.ComponentProps<'input'>
> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div className="my-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...inputProps}
        className="w-full mt-2 flex items-center justify-between rounded-md bg-white py-2 px-3 shadow-sm ring-1 ring-slate-700/10"
      />
    </div>
  );
};

export type SelectDataType = { raw: string };

export function Select<T extends SelectDataType>(
  props: {
    label: string;
    data: T[];
    click: (arg0: T) => void;
    value: T;
  } & React.ComponentProps<'div'>,
) {
  const { label, click, ...other } = props;
  const [value, setValue] = useState(props.value);
  const [showItem, setShow] = useState(false);
  const selectItem = (e: T) => {
    setValue(e);
    setShow(false);
  };
  const [selectItems, setItems] = useState<T[]>(props.data);
  useEffect(() => {
    if (showItem)
      (async () => {
        const data = await (
          await fetch(`${host.api}/permission/role/all`)
        ).json();
        setItems(data);
      })();
  }, [showItem]);
  return (
    <div
      {...other}
      className="pointer-events-auto my-2 w-auto text-[0.8125rem] leading-5 text-slate-700"
    >
      <div className="font-semibold text-slate-900">{label}</div>
      <div
        onClick={(e) => {
          setShow((pre) => !pre);
          click(value);
        }}
        className="mt-2 flex items-center justify-between rounded-md bg-white py-2 px-3 shadow-sm ring-1 ring-slate-700/10"
      >
        {value.raw}
        <svg className="h-5 w-5 flex-none fill-slate-400">
          <path d="M10 3a1 1 0 0 1 .707.293l3 3a1 1 0 0 1-1.414 1.414L10 5.414 7.707 7.707a1 1 0 0 1-1.414-1.414l3-3A1 1 0 0 1 10 3Zm-3.707 9.293a1 1 0 0 1 1.414 0L10 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414Z"></path>
        </svg>
      </div>
      <div
        className={`${
          showItem ? '' : 'hidden'
        } mt-4 overflow-hidden rounded-md bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10`}
      >
        {selectItems.map((item, i) => (
          <div
            key={i}
            onClick={(e) => selectItem(item)}
            className="py-2 px-3 hover:bg-indigo-600 hover:text-white"
          >
            {item.raw}
          </div>
        ))}
      </div>
    </div>
  );
}
