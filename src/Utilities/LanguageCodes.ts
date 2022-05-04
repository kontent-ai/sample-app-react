import { IContentItem } from '@kentico/kontent-delivery';

const languageCodes = [
  'en-US', // default languages
  'es-ES',
];

const englishCode = languageCodes[0];
const spanishCode = languageCodes[1];

const languageCodesLowerCase = languageCodes.map((code) => code.toLowerCase());

const defaultLanguage = languageCodes[0];

export interface ILanguageObject<TContentItem extends IContentItem> {
  [key: string]: TContentItem | null;
}

const initLanguageCodeObject = <TContentItem extends IContentItem>(
  object: ILanguageObject<TContentItem> | null = null
): ILanguageObject<TContentItem> => {
  if (!object) {
    object = {};
  }

  languageCodes.forEach((language) => {
    if (object) {
      object[language] = null;
    }
  });

  return object;
};

export interface ILanguageObjectWithArray<TContentItem extends IContentItem> {
  [key: string]: TContentItem[];
}

const initLanguageCodeObjectWithArray = <TContentItem extends IContentItem>(
  object: ILanguageObjectWithArray<TContentItem> | null = null
): ILanguageObjectWithArray<TContentItem> => {
  if (!object) {
    object = {};
  }

  languageCodes.forEach((language) => {
    if (object) {
      object[language] = [];
    }
  });

  return object;
};

export {
  languageCodes,
  languageCodesLowerCase,
  defaultLanguage,
  initLanguageCodeObject,
  initLanguageCodeObjectWithArray,
  englishCode,
  spanishCode,
};
export default languageCodes;
