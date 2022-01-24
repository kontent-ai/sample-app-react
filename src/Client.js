import Cookies from 'universal-cookie';
import {
  selectedProjectCookieName,
  defaultProjectId
} from './Utilities/SelectedProject';

// kentico kontent
import { camelCasePropertyNameResolver, DeliveryClient } from '@kentico/kontent-delivery';

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
  propertyNameResolver: camelCasePropertyNameResolver
});

const resetClient = newProjectId => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: isPreview(),
    },
  });
  const cookies = new Cookies(document.cookies);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
};

export { Client, resetClient };
