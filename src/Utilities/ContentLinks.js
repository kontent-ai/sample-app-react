export function resolveContentLink(link) {
  switch (link.type) {
    case "article":
      return "/articles/" + link.url_slug;
    case "coffee":
      return "/store/coffees/" + link.url_slug;
    case "brewer":
      return "/store/brewers/" + link.url_slug;
    default:
      return "";
  }
}