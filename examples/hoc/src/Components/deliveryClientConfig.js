import { DeliveryClientConfig, TypeResolver } from "kentico-cloud-delivery-typescript-sdk";
import { Article } from './ArticleModel';

export default new DeliveryClientConfig("975bf280-fd91-488c-994c-2f04416e5ee3",[
    new TypeResolver('article', () => new Article())
]);