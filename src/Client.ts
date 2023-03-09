import Cookies from 'universal-cookie';
import {
  camelCasePropertyNameResolver,
  DeliveryClient,
} from '@kontent-ai/delivery-sdk';
import packageInfo from '../package.json';
import { selectedProjectCookieName } from './const';
import validator from 'validator';

const sourceTrackingHeaderName = 'X-KC-SOURCE';

const previewApiKey = process.env.REACT_APP_PREVIEW_API_KEY || '';

const cookies = new Cookies(document.cookie);

const getProjectId = (): string => {
  const projectId = process.env.REACT_APP_PROJECT_ID || '';

  let currentProjectId = projectId;

  if (projectId) {
    if (!validator.isUUID(projectId)) {
      console.error(
        `Your projectId (${projectId}) given in your environment variables is not a valid GUID.`
      );
    }
    return projectId;
  }
  currentProjectId = cookies.get(selectedProjectCookieName);
  return currentProjectId ? currentProjectId : '';
};

const currentProjectId = getProjectId();

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

  cookies.set(selectedProjectCookieName, newProjectId, {
    path: '/',
    sameSite: 'none',
    secure: true,
  });
};

export { Client, resetClient, getProjectId };
