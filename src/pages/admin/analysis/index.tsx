import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { host } from "../../../config";
import { Analysis } from "../../../database/model";


const ShowItem = ({ item }: { item: Analysis }) => {
    const [local, setLocal] = useState('')
    useEffect(() => {
        fetch(`${host.api}/tools/queryip?ip=${item.ip_src}`)
            .then(res => res.json())
            .then((data) => {
                data.data && data.data.length > 0 && setLocal(data.data[0].location)
            })
    })
    return <div className="flex">
        <h3 className="mx-2 my-1 px-2 py-1 flex items-center font-semibold text-xs rounded-md text-gray-500 bg-gray-200">ip: {item.ip_src}</h3>
        <span className="mx-2 my-1 px-2 py-1 flex items-center text-xs rounded-md font-semibold text-green-500 bg-green-50">
            ip归属地: {local}</span>
        <span className="mx-2 my-1 px-2 py-1 flex items-center text-xs rounded-md font-semibold text-green-500 bg-green-50">
            最后访问文件路径: {item.last_browse}</span>
        <span className="mx-2 my-1 px-2 py-1 flex items-center text-xs rounded-md font-semibold text-green-500 bg-green-50">
            最后访问时间: {item.updatedAt as unknown as string}</span>
        <span className="mx-2 my-1 px-2 py-1 flex items-center text-xs rounded-md font-semibold text-green-500 bg-green-50">
            访问次数: {item.count}</span>
    </div>
}

export default function AnalysisComponent(props: { analysis: Analysis[], count: number }) {
    return <div className="shadow-lg rounded-2xl p-4 bg-white">
        {
            props.analysis.map((item, key) => <ShowItem item={item} key={key} />)
        }
    </div>
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    const [analysis, count]: [Analysis[], number] = await (await fetch(`${host.api}/analysis/showforany`)).json()

    return {
        props: {
            analysis: analysis,
            count: count,
        }
    };
};