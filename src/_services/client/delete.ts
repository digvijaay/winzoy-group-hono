import { Context } from 'hono';
import ClientModel from '../../models/Client/index.js';
import { ServicesReturn, ServicesReturnType } from '../../utils/hendler.js';
export const deleteClient = async (
  c: Context,
  id: string,
  reason?: string
): Promise<ServicesReturnType> => {
  try {
    // Get user info from context (set by auth middleware)
    const user = c.get('user');

    // Get reason from query or body, with proper error handling
    let deleteReason = reason;

    // Only try to parse JSON body if content-type is application/json
    const contentType = c.req.header('Content-Type');
    if (
      !deleteReason &&
      contentType &&
      contentType.includes('application/json')
    ) {
      try {
        const body = await c.req.json();
        deleteReason = body.reason;
      } catch (error) {
        // If JSON parsing fails, continue without the body
        console.warn('Failed to parse request body:', error);
      }
    }

    if (!deleteReason) {
      return ServicesReturn(
        400,
        'Delete reason is required',
        'No reason provided'
      );
    }

    // Perform the soft delete by setting the deletedBy field
    const deletedClient = await ClientModel.findByIdAndUpdate(
      id,
      {
        deletedBy: {
          fullName: user.fullName,
          email: user.email,
          reason: deleteReason,
          date: new Date(),
        },
      },
      { new: true }
    );

    if (!deletedClient) {
      return ServicesReturn(404, 'Client not found', 'Client not found');
    }

    // Return the standard response format with the full client data
    // (including the new deletion information)
    return ServicesReturn(200, 'Client deleted successfully', deletedClient);
  } catch (error: any) {
    return ServicesReturn(500, 'Error deleting client', error.message);
  }
};
