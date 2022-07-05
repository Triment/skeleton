import { DataBase } from '../database';

export const withDB = (handler) => async (req, res) => {
  if (!DataBase.isInitialized) await DataBase.initialize();
  return handler(req, res);
};
