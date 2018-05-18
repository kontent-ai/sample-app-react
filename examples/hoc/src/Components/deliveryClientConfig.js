import { TypeResolver } from "kentico-cloud-delivery";
import { Article } from './ArticleModel';

export default config = {
    projectId: '975bf280-fd91-488c-994c-2f04416e5ee3',
    typeResolvers: [
        new TypeResolver('article', () => new Article())
    ]
}
