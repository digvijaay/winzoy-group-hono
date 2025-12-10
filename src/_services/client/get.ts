// src/_services/client/get.ts

import ClientModel from '../../models/Client/index.js';
import { IClientCreate } from '../../models/Client/types.js';
import { clientPageName, ClientPageName } from '../../utils/enum.js';
import { ServicesReturn, ServicesReturnType } from '../../utils/hendler.js';
export const getAllClients = async (page_name: string) => {
  if (!clientPageName.includes(page_name as any)) {
    return {
      status: 404,
      body: {
        message: 'Page name not found',
      },
    };
  }
  const clients = await ClientModel.find({
    'colleges.page_name': page_name,
  }).lean();
  return {
    status: 200,
    body: {
      data: clients,
    },
  };
};
