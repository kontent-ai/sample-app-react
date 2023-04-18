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

const getEnvironmentIdFromEnvironment = (): string | null | undefined => {
  const environmentIdFromEnv = process.env.REACT_APP_PROJECT_ID;

  if (environmentIdFromEnv && !validator.isUUID(environmentIdFromEnv)) {
    console.error(
      `Your environmentId (${environmentIdFromEnv}) given in your environment variables is not a valid GUID.`
    );
    return null;
  }

  return environmentIdFromEnv;
};

const getEnvironmentIdFromCookies = (): string | null => {
  const environmentIdFromCookie = cookies.get(selectedProjectCookieName);

  if (environmentIdFromCookie && !validator.isUUID(environmentIdFromCookie)) {
    console.error(
      `Your environmentId (${environmentIdFromCookie}) from cookies is not a valid GUID.`
    );
    return null;
  }

  return environmentIdFromCookie;
};

const currentEnvironmentId =
  getEnvironmentIdFromEnvironment() ?? getEnvironmentIdFromCookies() ?? '';

const isPreview = (): boolean => previewApiKey !== '';

type GlobalHeadersType = {
  header: string;
  value: string;
};

const Client = new DeliveryClient({
  environmentId: currentEnvironmentId,
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

const createClient = (newEnvironmentId: string): DeliveryClient =>
  new DeliveryClient({
    environmentId: newEnvironmentId,
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

type ClientState = [DeliveryClient, (environmentId: string) => void];

const ClientContext = createContext<ClientState>(undefined as never);

export const useClient = (): ClientState => useContext(ClientContext);

export const ClientProvider: FC = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [client, setClient] = useState(Client);

  const updateClient = useCallback((newEnvironmentId: string) => {
    setClient(createClient(newEnvironmentId));

    cookies.set(selectedProjectCookieName, newEnvironmentId, {
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

export {
  createClient,
  getEnvironmentIdFromEnvironment,
  getEnvironmentIdFromCookies,
};
