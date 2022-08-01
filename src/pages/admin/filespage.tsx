import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { join } from 'path';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { FileIcon, FolderIcon } from '../../components/docs/icons';
import { Progress } from '../../components/progress';
import { config, host } from '../../config';
import { useModal } from '../../dashboard/provider/modal';
import useUser from '../../lib/useUser';
import { AnalysisCount } from '../../util/Analysis';
import { PortalModal } from '../../util/Portal';
import { FileItemType } from '../api/file/getfiles';

export default function fileManger({ data }: { data: FileItemType[] }) {
  //console.log(data)
  const router = useRouter();
  const { show, refOfModal } = useModal();
  const [currentFileName, setDownloadName] = useState<string>(); //modal显示文件名
  const [downloadProgress, setProgress] = useState(0); //下载进度
  const getNavBar = (path: string) => {
    let b: { value: string; fullpath: string }[] = [];
    let fullptemp = '';
    for (const t of path.split('/').slice(1)) {
      fullptemp += '/' + t;
      b.push({
        value: t,
        fullpath: fullptemp,
      });
    }
    return b;
  };
  const { register, handleSubmit } = useForm(); //上传控制
  const [currentPath, setCurrentPath] = useState<
    { value: string; fullpath: string }[]
  >(getNavBar((router.query.fullpath! as string) || '/')); //面包导航栏
  const controller = new AbortController();
  const { signal } = controller;

  async function downloadFile(path: string) {
    // await fetch(`/api/file/getfile?getPath=${path}`)

    var a = document.createElement('a'); //control+C+V大法好🐮🍺
    document.body.appendChild(a); //兼容火狐，将a标签添加到body当中
    //var url = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
    const url = `/api/file/getfile?getPath=${path}`;
    a.href = url;
    a.target = '_self'; // a标签增加target属性
    a.click();
    a.remove(); //移除a标签
    window.URL.revokeObjectURL(url);

    return;
    // let paths = path.split('/');
    // var filename = paths[paths.length - 1];
    // if (filename === currentFileName) {
    //   show();
    //   return;
    // }
    // setDownloadName(filename);
    // //下载
    // show();
    // const response = await fetch(`/api/file/getfile?getPath=${path}`, {
    //   signal,
    // });
    // const reader = response!.body!.getReader();
    // const contentLength = response.headers.get('Content-Length');
    // //console.log(refOfModal.current);
    // //console.log(contentLength, '内容大小')
    // let receivedLength = 0;
    // let chunks: Uint8Array[] = new Array<Uint8Array>();
    // var startLength = 0;
    // const rateInterval = setInterval(() => {
    //   //速度和定时器的时间有关系这里是0.5s 所以应当乘以二得到秒速
    //   const rateView = document.getElementById('download-rate');
    //   let rate: number = ((receivedLength - startLength) * 4) / 1024;
    //   const value = `${
    //     rate > 1024
    //       ? rate > 1024 * 1024
    //         ? `${rate / (1024 * 1024)}Gb`
    //         : `${rate / 1024}Mb`
    //       : `${rate}Kb`
    //   }/s`;
    //   rateView!.innerText = value;
    //   startLength = receivedLength;
    // }, 250);
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   chunks.push(value);
    //   receivedLength += value.length;
    //   let prog = (receivedLength / parseInt(contentLength!)) * 100;
    //   prog === downloadProgress ? '' : setProgress(prog);
    //   //setProgress(prog===downloadProgress?)
    // }
    // clearInterval(rateInterval);
    // let blob = new Blob(chunks);
    // var a = document.createElement('a'); //control+C+V大法好🐮🍺
    // document.body.appendChild(a); //兼容火狐，将a标签添加到body当中
    // var url = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
    // a.href = url;
    // a.download = filename;
    // a.target = '_blank'; // a标签增加target属性
    // a.click();
    // a.remove(); //移除a标签
    // window.URL.revokeObjectURL(url);
    // setTimeout(() => {
    //   show();
    //   setProgress(0);
    // }, 1000);
  }
  const { user } = useUser({});

  const uploadFiles = async (d: FieldValues) => {
    if (d.file.length > 0) {
      const formData = new FormData();
      formData.append('path', router.query.fullpath as string);
      for (const file of d.file) {
        formData.append(file.name, file);
        // formData.append('file', file)
        // formData.append('path', router.query.fullpath as string)

        // console.log(data)
      }
      const data = await fetch(`${host.api}/file/upload`, {
        method: 'POST',
        body: formData,
      });
      router.push('/admin/filespage', {
        query: router.query,
      });
    }
  };

  const [readme, setReadme] = useState('');

  useEffect(() => {
    fetch(
      `${host.api}/file/getfile?getPath=${join(
        config.fileServerPath,
        router.query.fullpath as string,
        'readme.md',
      )}`,
    )
      .then((res) => {
        if (res.status == 200)
          return res.text();
      })
      .then((data) => {
        if (data)
          setReadme(data);
      });
  });
  return (
    <div className="w-ful h-full overflow-y-auto shadow-lg rounded-2xl bg-white p-5">
      <p className="text-lg my-4 font-medium text-sky-500 dark:text-sky-400">
        默认500kb/s下载，登录可享受超高速下载（企业微信联系林帅开通）
      </p>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 my-4">
          <li
            onClick={(e) => {
              router.push(`/admin/filespage?fullpath=/`);
            }}
            className="inline-flex items-center"
          >
            <a
              href={`/admin/filespage?fullpath=/`}
              className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              根目录
            </a>
          </li>
          {currentPath.map((item, key) => {
            return (
              <li key={key}>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-cyan-400 hover:text-cyan-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href={`/admin/filespage?fullpath=${item.fullpath}`}
                    className="ml-1 text-sm font-medium text-blue-400 hover:text-blue-700 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {item.value}
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
      {/* 下载进度条 */}
      <PortalModal>
        <p>{currentFileName}</p>
        <span id="download-rate"></span>
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
      {data.map((item, index) =>
        item.name != 'readme.md' ? (
          <div key={index} className={`flex mb-3 relative hover:last:flex`}>
            {item.type == 'folder' ? <FolderIcon /> : <FileIcon />}
            <span
              onClick={(e) => {
                if (item.type === 'file') {
                  downloadFile(config.fileServerPath + '/' + item.fullpath);
                } else {
                  router.push(`/admin/filespage?fullpath=${item.fullpath}`);
                  setCurrentPath(getNavBar(item.fullpath));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                console.log('触发上下文菜单');
              }}
              className="pl-2 hover:text-yellow-500 cursor-pointer ease-in duration-300"
            >
              {item.name}
            </span>
            <div className="absolute hidden bottom-0 left-0 w-48 h-96 bg-white"></div>
          </div>
        ) : null,
      )}
      {readme.length > 0 && <ReactMarkdown className="rounded-xl bg-gray-500 text-white p-4">
        {readme}
      </ReactMarkdown>}
      <form
        className={user?.username !== 'guest' ? '' : 'hidden'}
        onSubmit={handleSubmit((d) => uploadFiles(d))}
      >
        <label className="block">
          <span className="sr-only">选择文件</span>
          <input
            {...register('file')}
            multiple
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
        <input
          className="mt-4 cursor-pointer text-gray-500 text-sm hover:text-blue-500 hover:bg-blue-50 bg-gray-50 rounded-full px-4 py-2"
          type="submit"
        />
      </form>
    </div>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  await AnalysisCount(ctx);
  const data: FileItemType[] = await (
    await fetch(
      `${host.api}/file/getfilebysplit?fullpath=${ctx.query.fullpath}`,
    )
  ).json();
  return {
    props: {
      data: data,
    },
  };
};
