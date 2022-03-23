import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { translate } from "react-translate";
import { Client } from "../Client";
import dateFormat from 'dateformat';
import { dateFormats, defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";
import { Link } from "react-router-dom";

const Articles = ({ language, t }) => {

  const [articles, setArticles] = useState(initLanguageCodeObject());

  dateFormat.i18n = dateFormats[language] || dateFormats[0];

  useEffect(() => {
    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('article')
      .orderByDescending('elements.post_date')
      .limitParameter(10);

    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setArticles(data => ({
          ...data,
          [currentLanguage]: response.data.items
        }));
      });
  }, [language]);

  const formatDate = value => {
    return dateFormat(value, 'mmmm d');
  };

  let counter = 0;

  const articlesComponent = articles[language].reduce((result, article, index) => {
    if (index % 4 === 0) {
      result.push(<div className="clear" key={counter++} />);
    }

    const title =
      article.elements.title.value.trim().length > 0
        ? article.elements.title.value
        : t('noTitleValue');

    const postDate = formatDate(article.elements.postDate.value);

    const imageLink =
      article.elements.teaserImage.value[0] !== undefined ? (
        <img
          alt={'Article ' + title}
          className="article-tile-image"
          src={article.elements.teaserImage.value[0].url}
          title={'Article ' + title}
        />
      ) : (
        <div className="article-tile-image placeholder-tile-image">
          {t('noTeaserValue')}
        </div>
      );

    const summary =
      article.elements.summary.value.trim().length > 0
        ? article.elements.summary.value
        : t('noSummaryValue');

    const link = `/${language}/articles/${article.system.id}`;

    result.push(
      <div className="col-md-3" key={counter++}>
        <div className="article-tile">
          <Link to={link}>{imageLink}</Link>
          <div className="article-tile-date">{postDate}</div>
          <div className="article-tile-content">
            <h2 className="h4">
              <Link to={link}>{title}</Link>
            </h2>
            <p className="article-tile-text">{summary}</p>
          </div>
        </div>
      </div>
    );

    return result;
  }, []);
  return <div className="container">{articlesComponent}</div>;
}

export default translate('Articles')(Articles);

