import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import App from './App';
import {
  languageCodes,
  languageCodesLowerCase,
} from './Utilities/LanguageCodes';
import { localizationObject } from './Utilities/LocalizationLoader';
import { IntlProvider } from 'react-intl';
import Cookies from 'universal-cookie';
import KontentSmartLink, { KontentSmartLinkEvent } from '@kentico/kontent-smart-link';
import { fetchChangeFeed } from './Client';
import { ChangeFeedItem } from './types';

export type SetLanguageType = (newLanguage: string, newUrl?: string) => void;

interface LocalizedAppProps {
  lang: string;
}

const LocalizedApp: React.FC<LocalizedAppProps> = ({ lang }) => {
  const [continuation, setContinuation] = useState<string>("");
  const [changes, setChanges] = useState<ChangeFeedItem[] | null>(null);

  const [scheduleRunning, setScheduleRunning] = useState<boolean>(false);

  const [inWebSpotlight, setInWebSpotlight] = useState<boolean>(false);

  const cookies = useMemo(() => new Cookies(document.cookie), []);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const checkChanges = useCallback((): void => {
    if (scheduleRunning || changes !== null) {
      return;
    }
    setScheduleRunning(true);
    fetchChangeFeed(continuation)
      .then(
        response => {
          const newContinuation = response.headers['x-continuation'] || "";
          setContinuation(newContinuation);
          if (response.data) {
            setChanges(response.data);
          } else {
            setChanges([]);
          }

          return response;
        }
      ).then(console.log)
      .then(() => setScheduleRunning(false))
      .then(() => !inWebSpotlight && setTimeout(() => setChanges(null), 5000));
  }, [continuation, scheduleRunning, inWebSpotlight, changes]);

  useEffect(() => {
    cookies.set('lang', lang, { path: '/' });
  }, [lang, cookies]);

  // Web spotlight
  const onMessageReceivedFromIframe = React.useCallback(
    event => {
      if (event.data.type && event.data.type === 'kontent-smart-link:initialized:response') {
        setInWebSpotlight(true);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe);
    return () => {
      window.removeEventListener("message", onMessageReceivedFromIframe);
    }
  }, [onMessageReceivedFromIframe]);

  useEffect(() => {
    // This is just an example of SDK initialization inside ES6 module.
    // HTML markup should still contain all necessary data-attributes (e.g. PageSection component).
    const kontentSmartLink = KontentSmartLink.initialize({
      defaultDataAttributes: {
        projectId: process.env.REACT_APP_PROJECT_ID,
        languageCodename: lang
      },
      queryParam: "preview",
    });

    kontentSmartLink.on(KontentSmartLinkEvent.Refresh, (data, metadata, originalRefresh) => {
      // your custom refresh logic
      console.log('Refreshing');
      setChanges(null);
    });

    return () => {
      kontentSmartLink.destroy();
    };
  }, [lang]);

  // No web spotlight
  useEffect(() => {
    if ((!scheduleRunning && !inWebSpotlight) || changes === null) {
      checkChanges();
    }
  }, [scheduleRunning, inWebSpotlight, changes, checkChanges])

  const setLanguageCode: SetLanguageType = (newLanguage, newUrl) => {
    if (lang === newLanguage || languageCodes.indexOf(newLanguage) < 0) {
      return;
    }

    const urlParts = pathname.split('/');
    const currentLanguage = pathname.split('/')[1];
    if (languageCodesLowerCase.indexOf(currentLanguage) > -1) {
      urlParts[1] = newLanguage;
    } else {
      urlParts.splice(1, 0, newLanguage);
    }

    if (newUrl) {
      navigate(urlParts.splice(0, 2).join('/').toLowerCase() + newUrl);
    } else {
      navigate(urlParts.join('/').toLowerCase());
    }
  };

  if (pathname !== pathname.toLowerCase()) {
    return <Navigate to={pathname.toLowerCase()} replace />;
  }

  return (
    <div>
      <IntlProvider locale={lang} messages={localizationObject[lang]}>
        <App changeLanguage={setLanguageCode} changes={changes || []} />
      </IntlProvider>
    </div>
  );
};

export default LocalizedApp;
