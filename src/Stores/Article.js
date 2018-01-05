import Client from "../Client.js";
import { SortOrder } from 'kentico-cloud-delivery-typescript-sdk';

import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes'

let articleList = initLanguageCodeObject();
let articleDetails = initLanguageCodeObject();

let changeListeners = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

class ArticleStore {

  // Actions

  provideArticle(articleSlug, language) {

    let query = Client.items()
      .type('article')
      .equalsFilter('elements.url_pattern', articleSlug)
      .elementsParameter(['title', 'teaser_image', 'post_date', 'body_copy', 'video_host', 'video_id', 'tweet_link', 'theme', 'display_options'])

    if (language) {
      query.languageParameter(language);
    }

    query.get()
      .subscribe(response => {
        if (!response.isEmpty) {
          if (language) {
            articleDetails[language][articleSlug] = response.items[0];
          } else {
            articleDetails[defaultLanguage][articleSlug] = response.items[0];
          }
          notifyChange();
        }
      })
  }

  provideArticles(count, language) {

    let query = Client.items()
      .type('article')
      .orderParameter("elements.post_date", SortOrder.desc);

    if (language) {
      query.languageParameter(language);
    }

    query.get()
      .subscribe(response => {
        if (language) {
          articleList[language] = response.items;
        } else {
          articleList[defaultLanguage] = response.items
        }
        notifyChange();
      });
  }

  // Methods
  getArticle(articleSlug, language) {
    if (language) {
      return articleDetails[language][articleSlug];
    } else {
      return articleDetails[defaultLanguage][articleSlug];
    }

  }

  getArticles(count, language) {
    if (language) {
      return articleList[language].slice(0, count);
    }
    else {
      return articleList[defaultLanguage].slice(0, count);
    }
  }

  // Listeners
  addChangeListener(listener) {
    changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    changeListeners = changeListeners.filter((element) => {
      return element !== listener;
    });
  }

}

export default new ArticleStore();