// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';

const projectId = '975bf280-fd91-488c-994c-2f04416e5ee3';
const previewApiKey = "";

// models
import { AboutUs } from './Models/AboutUs'
import { Accessory } from './Models/Accessory'
import { Article } from './Models/Article'
import { Brewer } from './Models/Brewer'
import { Cafe } from './Models/Cafe'
import { Coffee } from './Models/Coffee'
import { FactAboutUs } from './Models/FactAboutUs'
import { Grinder } from './Models/Grinder'
import { HeroUnit } from './Models/HeroUnit'
import { Home } from './Models/Home'
import { HostedVideo } from './Models/HostedVideo'
import { Office } from './Models/Office'
import { Tweet } from './Models/Tweet'

// configure type resolvers
let typeResolvers = [
  new TypeResolver('about_us', () => new AboutUs()),
  new TypeResolver('accessory', () => new Accessory()),
  new TypeResolver('article', () => new Article()),
  new TypeResolver('brewer', () => new Brewer()),
  new TypeResolver('cafe', () => new Cafe()),
  new TypeResolver('coffee', () => new Coffee()),
  new TypeResolver('fact_about_us', () => new FactAboutUs()),
  new TypeResolver('grinder', () => new Grinder()),
  new TypeResolver('hero_unit', () => new HeroUnit()),
  new TypeResolver('home', () => new Home()),
  new TypeResolver('hosted_video', () => new HostedVideo()),
  new TypeResolver('office', () => new Office()),
  new TypeResolver('tweet', () => new Tweet())
];


function isPreview() {
  return previewApiKey !== "";
}

export default new DeliveryClient(
  new DeliveryClientConfig(projectId, typeResolvers,
    {
      enablePreviewMode: isPreview(),
      previewApiKey: previewApiKey
    }
  )
)