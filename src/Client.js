// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-delivery-typescript-sdk';

const projectId = '5e7a9870-093b-4fb0-8e22-2f6da714ca99';
const previewApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzNDg4MDhhNzlmNDY0YTNiOTYyODM4N2QzYjY1M2U1YyIsImlhdCI6IjE1MjE2NjM2MTUiLCJleHAiOiIxODY3MjYzNjE1IiwicHJvamVjdF9pZCI6IjVlN2E5ODcwMDkzYjRmYjA4ZTIyMmY2ZGE3MTRjYTk5IiwidmVyIjoiMS4wLjAiLCJhdWQiOiJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSJ9.tt7mErgvxy6ExwGc0Gbg0vq5lSciyE20YpSQNr8VV9M";

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