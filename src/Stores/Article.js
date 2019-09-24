import { Client } from '../Client.js';
import { SortOrder } from '@kentico/kontent-delivery';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LanguageCodes';
import { spinnerService } from '@simply007org/react-spinners';

let unsubscribe = new Subject();
const resetStore = () => ({
  articleList: initLanguageCodeObject(),
  articleDetails: initLanguageCodeObject()
});
let { articleList, articleDetails } = resetStore();

let changeListeners = [];

let notifyChange = () => {
  changeListeners.forEach(listener => {
    listener();
  });
};

class Article {
  // Actions

  provideArticle(articleId, language) {
    let query = Client.items()
      .type('article')
      .equalsFilter('system.id', articleId)
      .elementsParameter([
        'title',
        'teaser_image',
        'post_date',
        'body_copy',
        'video_host',
        'video_id',
        'tweet_link',
        'theme',
        'display_options',
        'metadata__meta_title',
        'metadata__meta_description',
        'metadata__og_title',
        'metadata__og_description',
        'metadata__og_image',
        'metadata__twitter_title',
        'metadata__twitter_site',
        'metadata__twitter_creator',
        'metadata__twitter_description',
        'metadata__twitter_image'
      ]);

    if (language) {
      query.languageParameter(language);
    }

    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }

    query
      .toObservable()
      .pipe(takeUntil(unsubscribe))
      .subscribe(response => {
        if (!response.isEmpty) {
          if (language) {
            articleDetails[language][articleId] = response.items[0];
          } else {
            articleDetails[defaultLanguage][articleId] = response.items[0];
          }
          notifyChange();
        }
      });
  }

  provideArticles(language) {
    let query = Client.items()
      .type('article')
      .orderParameter('elements.post_date', SortOrder.desc);

    if (language) {
      query.languageParameter(language);
    }

    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }

    query
      .toObservable()
      .pipe(takeUntil(unsubscribe))
      .subscribe(response => {
        if (language) {
          articleList[language] = response.items;
        } else {
          articleList[defaultLanguage] = response.items;
        }
        notifyChange();
      });
  }

  // Methods
  getArticle(articleId, language) {
    spinnerService.hide('apiSpinner');
    if (language) {
      return articleDetails[language][articleId];
    } else {
      return articleDetails[defaultLanguage][articleId];
    }
  }

  getArticles(count, language) {
    spinnerService.hide('apiSpinner');
    if (language) {
      return articleList[language].slice(0, count);
    } else {
      return articleList[defaultLanguage].slice(0, count);
    }
  }

  // Listeners
  addChangeListener(listener) {
    changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    changeListeners = changeListeners.filter(element => {
      return element !== listener;
    });
  }

  unsubscribe() {
    unsubscribe.next();
    unsubscribe.complete();
    unsubscribe = new Subject();
  }
}

let ArticleStore = new Article();

export { ArticleStore, resetStore };
