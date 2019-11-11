function getActiveAudiences() {
  const audienceIds = [];
  const experiments = window.optimizely.get('state').getExperimentStates();
  for (var experimentId in experiments) {
    if (experiments.hasOwnProperty(experimentId)) {
      const experiment = experiments[experimentId];
      for (var i = 0; i < experiment.audiences.length; i++) {
        const audienceId = experiment.audiences[i].id;
        if (audienceIds.indexOf(audienceId) < 0) {
          audienceIds.push(audienceId);
        }
      }
    }
  }

  return audienceIds;
}

function isArticleForAudiences(article, audienceIds) {
  const targetAudiences =
    article.targetAudiences &&
    article.targetAudiences.value &&
    JSON.parse(article.targetAudiences.value);
  const targetAudienceIds =
    targetAudiences && targetAudiences.map(item => `${item.id}`);
  if (!targetAudienceIds) {
    // False for no audiences when none set, true for all audiences when not set
    return false;
  }

  for (var i = 0; i < targetAudienceIds.length; i++) {
    if (audienceIds.indexOf(targetAudienceIds[i]) >= 0) {
      return true;
    }
  }

  return false;
}

export function getPersonalizedArticles(articles, count) {
  const audienceIds = getActiveAudiences();
  if (!audienceIds.length) {
    return articles.slice(0, count);
  }

  const matching = [];
  for (var i = 0; i < articles.length; i++) {
    const article = articles[i];
    if (isArticleForAudiences(article, audienceIds)) {
      matching.push(article);
      if (matching.length >= count) {
        break;
      }
    }
  }

  return matching;
}
