import Client from "../Client.js";
import { debounce } from "rxjs/operator/debounce";

import languageCodes from '../Utilities/LanguageCodes'


let articleList = {};
languageCodes.forEach(language => {
  articleList[language] = [];
})

let articleDetails = {};

let changeListeners = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

class ArticleStore {

  // Actions

  provideArticle(articleSlug) {

    Client.items()
      .type('article')
      .equalsFilter('elements.url_pattern', articleSlug)
      .elementsParameter(['title', 'teaser_image', 'post_date', 'body_copy', 'video_host', 'video_id', 'tweet_link', 'theme', 'display_options'])
      .get()
      .subscribe(response => {
        if (!response.isEmpty) {
          articleDetails[articleSlug] = response.items[0];
          notifyChange();
        }
      })
  }

  provideArticles(count, language) {

    let query = Client.items()
      .type('article');

    if (language) {
      query.languageParameter(language);
    }

    query.get()
      .subscribe(response => {
        if (language) {
          articleList[language] = response.items;
        } else {
          articleList[0] = response.items
        }
        notifyChange();
      });
  }

  // Methods
  getArticle(articleSlug, language) {
    return articleDetails[articleSlug];
  }

  getArticles(count, language) {
    if (language) {
      return articleList[language].slice(0, count);
    }
    else {
      return articleList[0].slice(0, count);
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