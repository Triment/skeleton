import { getCookie, setCookie } from 'cookies-next';
import { randomUUID } from 'crypto';
import { NextPageContext } from 'next';
import { getClientIp } from 'request-ip';
import { DataBase } from '../database';
import { Analysis } from '../database/model';

export const AnalysisCount = async ({ req, res }: NextPageContext) => {
  if (!DataBase.isInitialized) await DataBase.initialize();
  const user_uuid = getCookie('user_uuid', { req, res });
  const ip = getClientIp(req!);
  if (!!user_uuid) {
    //浏览器id
    const analysis = await DataBase.manager.findOne(Analysis, {
      where: { user_uuid: user_uuid as string },
    });
    if (!!analysis) {
      analysis!.count += 1;
      analysis!.last_browse = req?.url;
      await DataBase.manager.save(analysis);
    }
  } else {
    const uuid = randomUUID();
    setCookie('user_uuid', uuid, {
      maxAge: 1000 * 60 * 60 * 24 * 20000,
      //domain: req?.headers['host'],
      //path: '/'
      req,
      res,
    });
    const analysis = new Analysis(ip!, uuid);
    analysis.last_browse = req?.url;
    try {
      await DataBase.manager.save(analysis);
      console.log('新访问者保存成功', analysis);
    } catch (error) {
      console.log(error);
    }
  }
};
