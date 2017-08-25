import Client from "../Client.js";

let articleList = [];
let articleListCapacity = 0;

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
    .get()
    .subscribe(response => {
      if (response.items.length > 0) {
        articleDetails[articleSlug] = response.items[0];
        notifyChange();
      }
    })
  }

  provideArticles(count) {
    if (count <= articleListCapacity) {
      return;
    }

    articleListCapacity = count;

    Client.items()
      .type('article')
      .get()
      .subscribe(response =>
        {
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