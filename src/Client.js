import Cookies from 'universal-cookie';
import {
  selectedProjectCookieName,
  defaultProjectId
} from './Utilities/SelectedProject';


import { camelCasePropertyNameResolver, DeliveryClient } from '@kentico/kontent-delivery';
import packageInfo from "../package.json";

const sourceTrackingHeaderName = "X-KC-SOURCE";

// environment variables
const projectId = process.env.REACT_APP_PROJECT_ID || '';
const previewApiKey = process.env.REACT_APP_PREVIEW_API_KEY || '';

const cookies = new Cookies(document.cookies);
let currentProjectId = projectId || cookies.get(selectedProjectCookieName);
if (currentProjectId) {
  cookies.set(selectedProjectCookieName, currentProjectId, { path: '/' });
} else {
  currentProjectId = defaultProjectId;
}

const isPreview = () => previewApiKey !== '';

let Client = new DeliveryClient({
  projectId: currentProjectId,
  previewApiKey: previewApiKey,
  defaultQueryConfig: {
    usePreviewMode: isPreview(),
  },
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${packageInfo.name};${packageInfo.version}`,
    },
  ],
  propertyNameResolver: camelCasePropertyNameResolver
});

const resetClient = newProjectId => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: isPreview(),
    },
    globalHeaders: (_queryConfig) => [
      {
        header: sourceTrackingHeaderName,
        value: `${packageInfo.name};${packageInfo.version}`,
      },
    ],
    propertyNameResolver: camelCasePropertyNameResolver
  });
  const cookies = new Cookies(document.cookies);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
};

export { Client, resetClient };
