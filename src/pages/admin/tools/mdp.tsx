import { useEffect, useState } from 'react';
import { Input } from '../../../components/input';
import { host } from '../../../config';

export default function Mdp() {
  const [data, setData] = useState<any>();
  const [phone, setPhone] = useState<string>();
  const getmdp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const result = await (
      await fetch(`${host.api}/tools/querymdp?mobile=${phone}`)
    ).json();
    setData(result);
    if (result.success) {
      setData(result);
    } else {
      setData('查询失败');
    }
  };
  return (
    <div className="my-8 flex flex-col h-full overflow-y-auto w-auto rounded-2xl p-4">
      <div className="py-2 relative mx-auto text-gray-600 w-72">
        <input
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="输入手机号"
        />
        <button
          onClick={getmdp}
          type="submit"
          className="absolute bg-white hover:bg-black p-3 right-0 rounded-xl"
        >
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      {!data || !data.success
        ? ''
        : data.data.map((item: any, index: number) => {
            return (
              <>
                <div key={index}>
                  名字:&nbsp; {item.mdpEmp.empName}
                  <br />
                  集团工号:&nbsp;{' '}
                  <span className="px-2 py-1  items-center text-xs rounded-md text-yellow-600 font-semibold bg-yellow-200">
                    {item.mdpEmp.empCode}
                  </span>
                  <br />
                  最后更新人:&nbsp; {item.mdpEmp.updatedBy}
                  <br />
                </div>
                <div>
                  {item.mdpOrgBases.map((orgItem: any, orgindex: number) => {
                    return (
                      <div
                        className="p-4 m-4 bg-white rounded-xl shadow-xl"
                        key={orgindex}
                      >
                        <span
                          className={`${
                            orgItem.sourceType !== 1 ? 'hidden ' : ''
                          }px-2 py-1 w-auto flex items-center text-xs rounded-md font-semibold text-purple-500 bg-purple-50`}
                        >
                          HR
                        </span>
                        <span
                          className={`${
                            orgItem.sourceType !== 2 ? 'hidden ' : ''
                          }px-2 py-1 flex items-center text-xs rounded-md text-white font-semibold bg-purple-500`}
                        >
                          新乾坤
                        </span>
                        <span
                          className={`${
                            orgItem.sourceType !== 3 ? 'hidden ' : ''
                          }px-2 py-1 flex items-center text-xs rounded-md text-black-400 font-semibold bg-yellow-400`}
                        >
                          银河{orgItem.sourceType}
                        </span>
                        <span className="text-gray-500">组织机构:</span>&nbsp;
                        {orgItem.orgName}
                        <br />
                        <span className="text-gray-500">上级:</span>&nbsp;
                        {orgItem.parentOrgName}
                        <br />
                        <span className="text-gray-500">组织路径:</span>&nbsp;
                        {orgItem.orgFullName}
                        <br />
                        <span className="text-gray-500">省区:</span>&nbsp;
                        {orgItem.affiliatedOrgName}
                        <br />
                        <span className="text-gray-500">最后更新:</span>&nbsp;
                        {orgItem.updatedBy}
                        <br />
                        <span className="text-gray-500">职位:</span>&nbsp;
                        {orgItem.positionName}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
    </div>
  );
}
