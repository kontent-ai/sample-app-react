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

  provideArticle(articleCodename) {
    if (articleDetailsPromises[articleCodename]) {
      return;
    }

    articleDetailsPromises[articleCodename] = Client.getItem(articleCodename).then((response) => {
      if (response.item.system) {
        articleDetails[articleCodename] = response.item;
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
      "elements": "title,teaser_image,post_date,summary",
      "order": "elements.post_date[DESC]"
    }).then((response) => {
      articleList = response.items;
      notifyChange();
    });
  }

  // Methods

  getArticle(articleCodename) {
    return articleDetails[articleCodename];
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