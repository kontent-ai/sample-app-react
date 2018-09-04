export function resolveContentLink(link, language) {
  let resultLink;
  switch (link.type) {
    case 'article':
      resultLink = `/articles/${link.itemId}`;
      break;
    case 'coffee':
      resultLink = `/coffees/${link.urlSlug}`;
      break;
    case 'brewer':
      resultLink = `/brewers/${link.urlSlug}`;
      break;
    default:
      resultLink = '';
  }

  if (language) {
    resultLink = `/${language.toLowerCase()}${resultLink}`;
  }

  return resultLink;
}
