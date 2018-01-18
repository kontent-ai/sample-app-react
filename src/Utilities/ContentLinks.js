export function resolveContentLink(link, language) {
  let resultLink;
  switch (link.type) {
    case "article":
      resultLink = `/articles/${link.url_slug}`;
      break;
    case "coffee":
      resultLink = `/coffees/${link.url_slug}`;
      break;
    case "brewer":
      resultLink = `/brewers/${link.url_slug}`; 
      break;
    default:
      resultLink = "";
  }

  if(language){
    resultLink = `/${language.toLowerCase()}${resultLink}`
  }

  return resultLink;
}