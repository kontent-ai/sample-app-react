import Cookies from 'universal-cookie';
import {
  camelCasePropertyNameResolver,
  DeliveryClient,
} from '@kontent-ai/delivery-sdk';
import packageInfo from '../package.json';
import { selectedProjectCookieName } from './const';
import validator from 'validator';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const sourceTrackingHeaderName = 'X-KC-SOURCE';

const previewApiKey = process.env.REACT_APP_PREVIEW_API_KEY || '';

const cookies = new Cookies(document.cookie);

const getProjectIdFromEnvironment = (): string | null | undefined => {
  const projectIdFromEnv = process.env.REACT_APP_PROJECT_ID;

  if (projectIdFromEnv && !validator.isUUID(projectIdFromEnv)) {
    console.error(
      `Your projectId (${projectIdFromEnv}) given in your environment variables is not a valid GUID.`
    );
    return null;
  }

  return projectIdFromEnv;
};

const getProjectIdFromCookies = (): string | null => {
  const projectIdFromCookie = cookies.get(selectedProjectCookieName);

  if (projectIdFromCookie && !validator.isUUID(projectIdFromCookie)) {
    console.error(
      `Your projectId (${projectIdFromCookie}) from cookies is not a valid GUID.`
    );
    return null;
  }

  return projectIdFromCookie;
};

const currentProjectId =
  getProjectIdFromEnvironment() ?? getProjectIdFromCookies() ?? '';

const isPreview = (): boolean => previewApiKey !== '';

type GlobalHeadersType = {
  header: string;
  value: string;
};

const Client = new DeliveryClient({
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

const createClient = (newProjectId: string): DeliveryClient =>
  new DeliveryClient({
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

type ClientState = [DeliveryClient, (projectId: string) => void];

const ClientContext = createContext<ClientState>(undefined as never);

export const useClient = (): ClientState => useContext(ClientContext);

export const ClientProvider: FC = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [client, setClient] = useState(Client);

  const updateClient = useCallback((newProjectId: string) => {
    setClient(createClient(newProjectId));

    cookies.set(selectedProjectCookieName, newProjectId, {
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }, []);

  return (
    <ClientContext.Provider
      value={useMemo(() => [client, updateClient], [client, updateClient])}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { createClient as resetClient, getProjectIdFromEnvironment, getProjectIdFromCookies };
