import KontentSmartLink from "@kontent-ai/smart-link"
import { currentEnvironmentId, isPreview } from "../Client"
import { useEffect } from "react"
import languageCodes, { englishCode } from "./LanguageCodes"
import Cookies from "universal-cookie"

const useKontentSmartLink = (deps?: React.DependencyList | undefined): void => {
  useEffect(() => {
    const cookies = new Cookies(document.cookie);
    const cookiesLang = cookies.get('lang');
    const lang = languageCodes.includes(cookiesLang) ? cookiesLang : englishCode;
    document.body.setAttribute('data-kontent-language-codename', lang);
    document.body.setAttribute('data-kontent-project-id', currentEnvironmentId);

    if (!isPreview()) {
      return;
    }

    const sdk = KontentSmartLink.initialize({
      defaultDataAttributes: {
        projectId: currentEnvironmentId,
        languageCodename: lang,
      },
      // Always enables the smart link injection.
      queryParam: undefined
    });

    return (): void => {
      sdk.destroy()
    };
  }, [deps])
}

export { useKontentSmartLink }