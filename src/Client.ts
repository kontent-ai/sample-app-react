import Cookies from 'universal-cookie';
import {
  camelCasePropertyNameResolver,
  DeliveryClient,
} from '@kentico/kontent-delivery';
import packageInfo from '../package.json';
import { selectedProjectCookieName } from './const';
import { defaultProjectId } from './Utilities/SelectedProject';

const sourceTrackingHeaderName = 'X-KC-SOURCE';

// environment variables
const projectId = process.env.REACT_APP_PROJECT_ID || '';
const previewApiKey = process.env.REACT_APP_PREVIEW_API_KEY || '';

const cookies = new Cookies(document.cookie);

let currentProjectId = projectId || cookies.get(selectedProjectCookieName);
if (currentProjectId) {
  cookies.set(selectedProjectCookieName, currentProjectId, { path: '/' });
} else {
  currentProjectId = defaultProjectId;
}

const isPreview = (): boolean => previewApiKey !== '';

type GlobalHeadersType = {
  header: string;
  value: string;
};

let Client = new DeliveryClient({
  projectId: currentProjectId,
  previewApiKey: previewApiKey,
  defaultQueryConfig: {
    usePreviewMode: isPreview(),
  },
  globalHeaders: (_queryConfig): GlobalHeadersType[] => [
    {
      header: sourceTrackingHeaderName,
      value: `${packageInfo.name};${packageInfo.version}`,
    },
  ],
  propertyNameResolver: camelCasePropertyNameResolver,
});

const resetClient = (newProjectId: string): void => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: isPreview(),
    },
    globalHeaders: (_queryConfig): GlobalHeadersType[] => [
      {
        header: sourceTrackingHeaderName,
        value: `${packageInfo.name};${packageInfo.version}`,
      },
    ],
    propertyNameResolver: camelCasePropertyNameResolver,
  });
  const cookies = new Cookies(document.cookie);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
};

export { Client, resetClient };
