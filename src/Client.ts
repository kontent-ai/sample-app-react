import Cookies from 'universal-cookie';
import {
  camelCasePropertyNameResolver,
  DeliveryClient,
} from '@kontent-ai/delivery-sdk';
import packageInfo from '../package.json';
import { selectedProjectCookieName } from './const';
import { defaultProjectId } from './Utilities/SelectedProject';
import Axios, { AxiosResponse } from "axios";
import { ChangeFeedItem } from './types';

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
    {
      header: 'X-KC-Wait-For-Loading-New-Content',
      value: 'true'
    }
  ],
  propertyNameResolver: camelCasePropertyNameResolver,
  proxy: {
    baseUrl: process.env.REACT_APP_BASE_DELIVERY_DOMAIN || undefined,
    basePreviewUrl: process.env.REACT_APP_BASE_PREVIEW_DOMAIN || undefined,
  }
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

const fetchChangeFeed = async (continuation: string = "") : Promise<AxiosResponse<ChangeFeedItem[], any>> => {
  const headers: Record<string, string> = {};

  if (continuation) {
    headers['x-continuation'] = continuation;
  }

  if (isPreview()) {
    headers['authorization'] = 'bearer ' + previewApiKey
  }

  return Axios.get(`${isPreview()
    ? process.env.REACT_APP_BASE_PREVIEW_DOMAIN
    : process.env.REACT_APP_BASE_DELIVERY_DOMAIN
    }/${projectId}/change-feed`,
    {
      headers
    });


  // return fetch(`${isPreview()
  //   ? process.env.REACT_APP_BASE_PREVIEW_DOMAIN
  //   : process.env.REACT_APP_BASE_DELIVERY_DOMAIN
  //   }/${projectId}/change-feed`,
  //   {
  //     mode: 'cors',
  //     credentials: ‘include’ 
  //     headers: {
  //       'authorization': `${isPreview() ? 'bearer ' + previewApiKey : undefined}`,
  //       'Access-Control-Expose-Headers': 'x-continuation',
  //       'x-continuation': continuation,
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   });
}

export { Client, resetClient, fetchChangeFeed };
