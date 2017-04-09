import Client from "../Client.js";

let articleList = [];
let articleListCapacity = 0;

let articleDetails = {};
let articleDetailsPromises = {};

let changeListeners = [];

let notifyChange = () => {
  changeListeners.forEach((listener) => {
    listener();
  });
}

class ArticleStore {

  // Actions

  provideArticle(articleSlug) {
    if (articleDetailsPromises[articleSlug]) {
      return;
    }

    articleDetailsPromises[articleSlug] = Client.getItems({
      "system.type": "article",
      "elements.url_pattern": articleSlug
    }).then((response) => {
      if (response.items.length > 0) {
        articleDetails[articleSlug] = response.items[0];
        notifyChange();
      }
    });
  }

  provideArticles(count) {
    if (count <= articleListCapacity) {
      return;
    }

    articleListCapacity = count;

    Client.getItems({
      "system.type": "article",
      "elements": "title,teaser_image,post_date,summary,url_pattern",
      "order": "elements.post_date[DESC]"
    }).then((response) => {
      articleList = response.items;
      notifyChange();
    });
  }

  // Methods

  getArticle(articleSlug) {
    return articleDetails[articleSlug];
  }

  getArticles(count) {
    return articleList.slice(0, count);
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