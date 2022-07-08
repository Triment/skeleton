import { useState } from 'react';

export const CheckBox: React.FC<{
  enable: boolean;
  label: string;
  click: (arg0: boolean) => void;
}> = ({ enable, label, click }) => {
  const [en, setEn] = useState(enable);
  return (
    <div className="my-4">
      <label className="block text-sm py-2 font-medium text-gray-700">
        {label}
      </label>
      <div
        onClick={() => {
          setEn((preEn) => !preEn);
          click(en);
        }}
        className={`pointer-events-auto h-6 w-10  rounded-full p-1 ring-1 ring-inset transition ease-in duration-300  ${
          enable
            ? 'bg-indigo-600 ring-black/20'
            : 'bg-slate-900/10 ring-slate-900/5'
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition ease-in duration-300 ${
            enable ? 'translate-x-4' : ''
          }`}
        ></div>
      </div>
    </div>
  );
};
