import React from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import { Client } from '../Client';
import {
  defaultLanguage,
  initLanguageCodeObjectWithArray,
} from '../Utilities/LanguageCodes';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Article } from '../Models/article';
import { Article as ArticleType } from '../Models/article';
import { projectModel } from '../Models/_project';

const Articles: React.FC = () => {
  const { locale: language, formatDate, formatMessage } = useIntl();
  const [articles, setArticles] = useState(
    initLanguageCodeObjectWithArray<ArticleType>()
  );

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<ArticleType>()
      .type(projectModel.contentTypes.article.codename)
      .orderByDescending('elements.post_date')
      .limitParameter(10);

    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setArticles((data) => ({
        ...data,
        [currentLanguage]: response.data.items as ArticleType[],
      }));
    });
  }, [language]);

  const makeFormatDate = (value: string): string => {
    return formatDate(value, {
      month: 'long',
      day: 'numeric',
    });
  };

  let counter = 0;

  const articlesComponent = articles[language].reduce(
    (result: JSX.Element[], article: Article, index: number) => {
      if (index % 4 === 0) {
        result.push(<div className="clear" key={counter++} />);
      }

      const title =
        article.elements.title.value.trim().length > 0
          ? article.elements.title.value
          : formatMessage({ id: 'Articles.noTitleValue' });

      const postDate = makeFormatDate(article.elements.postDate.value!!);

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
            {formatMessage({ id: 'noTeaserValue' })}
          </div>
        );

      const summary =
        article.elements.summary.value.trim().length > 0
          ? article.elements.summary.value
          : formatMessage({ id: 'noSummaryValue' });

      const link = article.system.id;

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
    },
    []
  );
  return <div className="container">{articlesComponent}</div>;
};

export default Articles;
