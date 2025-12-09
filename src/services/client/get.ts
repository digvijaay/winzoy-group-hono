import { ClientModel } from '@/models/Client';
import { clientPageName } from '@/utils/enum';

export const getAllClients = async (page_name: string) => {
  if (!clientPageName.includes(page_name as any)) {
    return {
      status: 400,
      body: {
        message: 'Invalid page name',
      },
    };
  }
  const clients = await ClientModel.find({
    'colleges.page_name': page_name,
  }).lean();
  return {
    status: 200,
    body: {
      clients,
    },
  };
};
