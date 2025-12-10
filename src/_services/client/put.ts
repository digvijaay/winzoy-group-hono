import ClientModel from '../../models/Client/index.js';
import { IClientDocument } from '../../models/Client/types.js';
import { ServicesReturn, ServicesReturnType } from '../../utils/hendler.js';

export const updateClient = async (
  id: string,
  updateData: Partial<IClientDocument>
): Promise<ServicesReturnType> => {
  try {
    const updatedClient = await ClientModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedClient) {
      return ServicesReturn(404, 'Client not found', 'Client not found');
    }

    return ServicesReturn(200, 'Client updated successfully', updatedClient);
  } catch (error: any) {
    return ServicesReturn(500, 'Error updating client', error.message);
  }
};
