import { FC } from 'react';

export const Progress: FC<{ state: number }> = ({ state }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
      <div
        style={{ width: `${state}%` }}
        className={`h-full text-center text-xs text-white bg-blue-500 rounded-full ease-in duration-300`}
      />
    </div>
  );
};
