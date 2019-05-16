import loadScript from 'load-script';

// We need to do the same what a snippet for Google Experiment does because we are in React which needs to load things dynamically
// GOOGLE ANALYTICS EXPERIMENT SNIPPET -- START
const loadedExperiments = {};

function loadExperimentCode(experimentKey) {
  const existingPromise = loadedExperiments[experimentKey];
  if (existingPromise) {
    return existingPromise;
  }

  const newPromise = new Promise((resolve, reject) => {
    const location = document.location;
    if (location.search.indexOf('utm_expid=' + experimentKey) > 0) {
      reject();
    }

    const cookies = document.cookie;

    function getCookie(cookieName) {
      if (cookies) {
        var i = cookies.indexOf(cookieName + '=');
        if (i > -1) {
          var j = cookies.indexOf(';', i);
          return escape(
            cookies.substring(
              i + cookieName.length + 1,
              j < 0 ? cookies.length : j
            )
          );
        }
      }
    }

    const x = getCookie('__utmx');
    const xx = getCookie('__utmxx');
    const hash = location.hash;

    const url = `http${
      location.protocol === 'https:' ? 's://ssl' : '://www'
    }.google-analytics.com/ga_exp.js?utmxkey=${experimentKey}&utmx=${
      x ? x : ''
    }&utmxx=${xx ? xx : ''}&utmxtime=${new Date().valueOf()}${
      hash ? '&utmxhash=' + escape(hash.substr(1)) : ''
    }`;
    loadScript(url, function(err) {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });

  loadedExperiments[experimentKey] = newPromise;
  return newPromise;
}
// GOOGLE ANALYTICS EXPERIMENT SNIPPET -- END

const chosenVariations = {};

function loadVariation(experimentId) {
  const existingPromise = chosenVariations[experimentId];
  if (existingPromise) {
    return existingPromise;
  }

  const newPromise = new Promise(resolve => {
    const scriptUrl = `https://www.google-analytics.com/cx/api.js?experiment=${experimentId}`;
    loadScript(scriptUrl, function(err) {
      if (err) {
        resolve(null);
      } else {
        var chosenVariation = window.cxApi.chooseVariation();
        resolve(chosenVariation);
      }
    });
  });

  chosenVariations[experimentId] = newPromise;
  return newPromise;
}

async function getVariation(experimentId, experimentKey) {
  await loadExperimentCode(experimentKey);
  const variationId = await loadVariation(experimentId);

  return variationId;
}

export { getVariation };
