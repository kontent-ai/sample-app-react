import { IContentItem } from '@kentico/kontent-delivery';

const languageCodes = [
  'en-US', // default languages
  'es-ES'
];

const englishCode = languageCodes[0];
const spanishCode = languageCodes[1];

const languageCodesLowerCase = languageCodes.map(code => code.toLowerCase());

const dateFormats = {
  'en-US': {
    dayNames: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    monthNames: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM']
  },
  'es-ES': {
    dayNames: [
      'dom.',
      'lun.',
      'mar.',
      'mi\u00e9.',
      'jue.',
      'vie.',
      's\u00e1b.',
      'domingo',
      'lunes',
      'martes',
      'mi\u00e9rcoles',
      'jueves',
      'viernes',
      's\u00e1bado'
    ],
    monthNames: [
      'ene.',
      'feb.',
      'mar.',
      'abr.',
      'may.',
      'jun.',
      'jul.',
      'ago.',
      'sept.',
      'oct.',
      'nov.',
      'dic.',
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ],
    timeNames: [
      'a. m.',
      'p. m.',
      'a. m.',
      'p. m.',
      'a. m.',
      'p. m.',
      'a. m.',
      'p. m.'
    ]
  }
};

const defaultLanguage = languageCodes[0];

export interface ILanguageObject<TContentItem extends IContentItem>{
  [key: string]:  TContentItem | null
}

const initLanguageCodeObject = <TContentItem extends IContentItem>(object: ILanguageObject<TContentItem> | null = null)
  : ILanguageObject<TContentItem> => {
  if (!object) {
    object = {};
  }

  languageCodes.forEach(language => {
    if (object) {
      object[language] = null;
    }
  });

  return object;
};

export interface ILanguageObjectWithArray<TContentItem extends IContentItem> {
  [key: string]:  TContentItem[]
}

const initLanguageCodeObjectWithArray = <TContentItem extends IContentItem>(object: ILanguageObjectWithArray<TContentItem> | null = null)
  : ILanguageObjectWithArray<TContentItem> => {
  if (!object) {
    object = {};
  }

  languageCodes.forEach(language => {
    if (object) {
      object[language] = [];
    }
  });

  return object;
};



// const getLanguageCode = (match: any): string => {
//   const languageCode = languageCodes[0];
//   if (!_.has(match, ['params', 'lang'])) {
//     return languageCode;
//   }
//
//   const languageParameter = _.get(match, ['params', 'lang']);
//   if (
//     languageParameter &&
//     languageCodesLowerCase.indexOf(languageParameter.toLowerCase()) > -1
//   ) {
//     return languageCodes[
//       languageCodesLowerCase.indexOf(languageParameter.toLowerCase())
//       ];
//   }
//   return defaultLanguage;
// };

export {
  languageCodes,
  languageCodesLowerCase,
  dateFormats,
  defaultLanguage,
  initLanguageCodeObject,
  initLanguageCodeObjectWithArray,
  englishCode,
  spanishCode
};
export default languageCodes;
