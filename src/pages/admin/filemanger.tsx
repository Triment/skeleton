import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FileIcon, FolderIcon } from '../../components/docs/icons';
import { Progress } from '../../components/progress';
import { host } from '../../config';
import { useModal } from '../../dashboard/provider/modal';
import { PortalModal } from '../../util/Portal';
import { NextPageContext } from 'next';
import { FileItemType } from '../api/file/getfiles';
import useUser from '../../lib/useUser';
import Link from 'next/link';

export default function fileManger({ data }: { data: FileItemType[] }) {
  //console.log(data)
  const { show, refOfModal } = useModal();
  const [currentFileName, setDownloadName] = useState<string>(); //modal显示文件名
  const [downloadProgress, setProgress] = useState(0); //下载进度
  const controller = new AbortController();
  const { signal } = controller;
  const { user } = useUser()
  async function downloadFile(path: string) {
    let paths = path.split('/');
    var filename = paths[paths.length - 1];
    if (filename === currentFileName) {
      show();
      return;
    }
    setDownloadName(filename);
    //下载
    show();
    const response = await fetch(`/api/file/getfile?getPath=${path}`, {
      signal,
    });
    const reader = response!.body!.getReader();
    const contentLength = response.headers.get('Content-Length');
    console.log(refOfModal.current)
    //console.log(contentLength, '内容大小')
    let receivedLength = 0;
    let chunks: Uint8Array[] = new Array<Uint8Array>();
    var startLength = 0;
    const rateInterval = setInterval(() => {
      //速度和定时器的时间有关系这里是0.5s 所以应当乘以二得到秒速
      const rateView = document.getElementById('download-rate')
      let rate: number = ((receivedLength - startLength)*4) / 1024
      const value = `${rate > 1024
        ? rate > 1024 * 1024
          ? `${rate / (1024 * 1024)}Gb`
          : `${rate / 1024}Mb`
        : `${rate}Kb`}
      /s`
      rateView!.innerText = value
      console.log(value, rateView)
      startLength = receivedLength;
    }, 250);
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      receivedLength += value.length;
      let prog = (receivedLength / parseInt(contentLength!)) * 100;
      prog === downloadProgress ? '' : setProgress(prog);
      //setProgress(prog===downloadProgress?)
    }
    clearInterval(rateInterval);
    let blob = new Blob(chunks);
    var a = document.createElement('a'); //control+C+V大法好🐮🍺
    document.body.appendChild(a); //兼容火狐，将a标签添加到body当中
    var url = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
    a.href = url;
    a.download = filename;
    a.target = '_blank'; // a标签增加target属性
    a.click();
    a.remove(); //移除a标签
    window.URL.revokeObjectURL(url);
    setTimeout(() => {
      show();
      setProgress(0);
    }, 1000);
  }

  return (
    <div className="w-ful h-full overflow-y-auto shadow-lg rounded-2xl bg-white p-4">
      {/* 下载进度条 */}
      <PortalModal>
            <p>{currentFileName}</p>
            <span id="download-rate">
              
            </span>
            <Progress state={downloadProgress} />

            <div className={`mt-4 flex justify-center`}>
              {downloadProgress != 100 ? (
                ''
              ) : (
                <div
                  className={`${downloadProgress == 100 ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  下载完成
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 1024 1024"
                    className={`text-green-500 mx-4 ease-in-out duration-300 `}
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </div>
      </PortalModal>
      <Link href={'/auth/login'}><span className="cursor-pointer pointer-events-auto my-8 rounded-md bg-green-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-center text-white hover:bg-green-500">
          登录
        </span></Link>
      
      {data.map((item, index) => (
        <div
          key={index}
          style={{ paddingLeft: `${item.index * 1}rem` }}
          className={`flex mb-3`}
        >
          {item.type == 'folder' ? <FolderIcon /> : <FileIcon />}
          <span
            onClick={() => {
              console.log(item)
              item.type === 'file' ? downloadFile(item.fullpath) : null
            }
            }
            className="pl-2 hover:text-yellow-500 cursor-pointer ease-in duration-300"
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const data: FileItemType[] = await (
    await fetch(`${host.api}/file/getfiles`)
  ).json();
  return {
    props: {
      data: data,
    },
  };
};
