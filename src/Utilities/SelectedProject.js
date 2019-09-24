import { resetClient, Client } from '../Client';

const selectedProjectCookieName = 'ProjectId';
const projectConfigurationPath = '/Admin/Configuration';

const defaultProjectId = '975bf280-fd91-488c-994c-2f04416e5ee3';

const getSampleProjectItems = (projectId = defaultProjectId) => {
  resetClient(projectId);

  return Client.items()
    .elementsParameter(['id'])
    .depthParameter(0)
    .getObservable();  
}

export {
  selectedProjectCookieName,
  projectConfigurationPath,
  defaultProjectId,
  getSampleProjectItems
};
