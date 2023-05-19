import { createClient } from '../Client';
import {
  Contracts,
  IDeliveryNetworkResponse,
  Responses,
} from '@kontent-ai/delivery-sdk';

const defaultEnvironmentId = '975bf280-fd91-488c-994c-2f04416e5ee3';

const getSampleProjectItems = (): Promise<
  IDeliveryNetworkResponse<
    Responses.IListContentItemsResponse,
    Contracts.IListContentItemsContract
  >
> => {
  const client = createClient(defaultEnvironmentId);

  return client.items().elementsParameter(['id']).depthParameter(0).toPromise();
};

export { defaultEnvironmentId, getSampleProjectItems };
