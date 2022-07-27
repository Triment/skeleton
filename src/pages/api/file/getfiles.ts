import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { join, resolve } from 'path';
import { config as globalConfig } from '../../../config';

export const getFileFolder = () => {
  //前后端公用地址
  return globalConfig.fileServerPath;
};

//
export type FileItemType = {
  name: string;
  type: string;
  children: FileItemType;
  fullpath: string;
  index: number;
};
//先序遍历文件夹
const dfs = (p: string) => {
  var res = [];
  var name = p.split('/').pop();
  var stack: {
    value: string;
    name: string;
    children: string[];
    index: number;
  }[] = [
    {
      value: p,
      name: name!,
      children: fs.readdirSync(resolve(getFileFolder(), p)),
      index: 1,
    },
  ];
  while (stack.length > 0) {
    var head = stack.shift()!;
    //console.log(resolve(getFileFolder()))
    const isDIR = fs
      .statSync(resolve(getFileFolder(), head.value))
      .isDirectory();
    let children;
    if (isDIR) {
      children = fs.readdirSync(resolve(getFileFolder(), head.value)).reverse();
    }
    res.push({
      name: head.name,
      type: isDIR ? 'folder' : 'file',
      children: children,
      fullpath: join(head.value, head.name),
      index: head.index,
    });
    if (!isDIR) continue;
    head.children.map((item, i) => {
      const fullpath = join(head.value, item);
      stack.unshift({
        value: fullpath,
        name: item,
        children: fs
          .statSync(resolve(getFileFolder(), head.value, item))
          .isDirectory()
          ? fs.readdirSync(resolve(getFileFolder(), head.value, item)).reverse()
          : [],
        index: head.index + 1,
      });
    });
  }
  return res;
};
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const data = dfs('');
  res.status(200).json(data);
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default handler;
