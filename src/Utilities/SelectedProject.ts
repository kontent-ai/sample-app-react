import { resetClient, Client } from '../Client';
import {
  Contracts,
  IDeliveryNetworkResponse,
  Responses,
} from '@kentico/kontent-delivery';

const defaultProjectId = '975bf280-fd91-488c-994c-2f04416e5ee3';

const getSampleProjectItems = (
  projectId = defaultProjectId
): Promise<
  IDeliveryNetworkResponse<
    Responses.IListContentItemsResponse,
    Contracts.IListContentItemsContract
  >
> => {
  resetClient(projectId);

  return Client.items().elementsParameter(['id']).depthParameter(0).toPromise();
};

export { defaultProjectId, getSampleProjectItems };
