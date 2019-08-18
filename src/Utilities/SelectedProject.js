import { resetClient, Client } from '../Client';

const selectedProjectCookieName = 'ProjectId';
const projectConfigurationPath = '/Admin/Configuration';

const defaultProjectId = '975bf280-fd91-488c-994c-2f04416e5ee3';

const SAMPLE_PROJECT_ITEM_COUNT = 30;

const getSampleProjectItemsCount = (projectId = defaultProjectId) => {
  resetClient(projectId);

  const client = Client.items()
    .elementsParameter(['id'])
    .depthParameter(0)
    .getObservable()       

  return client;   
}

export {
  selectedProjectCookieName,
  projectConfigurationPath,
  defaultProjectId,
  SAMPLE_PROJECT_ITEM_COUNT,
  getSampleProjectItemsCount
};
