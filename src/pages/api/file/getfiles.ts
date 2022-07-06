import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path, { resolve } from 'path';
import { config as globalConfig } from '../../../config';

export const getFileFolder = () => {
  return globalConfig.fileServerPath;
};
//先序遍历文件夹
const dfs = (p: string) => {
  if (!p) return;
  var res = [];
  var name = p.split('/').pop();
  var stack: {value: string, name: string, children: string[], index: number}[] = [{ value: p, name: name!, children: fs.readdirSync(p), index: 1 }];
  while (stack.length > 0) {
    var head = stack.shift()!;
    const isDIR = fs.statSync(head.value).isDirectory();
    let children;
    if (isDIR) {
      children = fs.readdirSync(head.value).reverse();
    }
    res.push({
      name: head.name,
      type: isDIR ? 'folder' : 'file',
      children: children,
      fullpath: head.value,
      index: head.index,
    });
    if (!isDIR) continue;
    head.children.map((item, i) => {
      const fullpath = resolve(head.value, item);
      stack.unshift({
        value: fullpath,
        name: item,
        children: fs.statSync(fullpath).isDirectory()
          ? fs.readdirSync(fullpath).reverse()
          : [],
        index: head.index + 1,
      });
    });
  }
  return res;
};
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const filepath = getFileFolder();
  const data = dfs(filepath);
  res.status(200).json(data);
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default handler;
