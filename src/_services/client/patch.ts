import ClientModel from '../../models/Client/index.js';
import { IClientCreate } from '../../models/Client/types.js';
import { ClientPageName } from '../../utils/enum.js';
import { ServicesReturn, ServicesReturnType } from '../../utils/hendler.js';

export const transferClient = async (
  id: string,
  pageName: ClientPageName,
  collegeIndex: number = 0
): Promise<ServicesReturnType> => {
  try {
    const updateQuery = {
      [`colleges.${collegeIndex}.page_name`]: pageName,
    };

    const updatedClient = await ClientModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
      runValidators: true,
    });

    if (!updatedClient) {
      return ServicesReturn(404, 'Client not found', 'Client not found');
    }

    return ServicesReturn(
      200,
      'Client transferred successfully',
      updatedClient
    );
  } catch (error: any) {
    return ServicesReturn(500, 'Error transferring client', error.message);
  }
};
