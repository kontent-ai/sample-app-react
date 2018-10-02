import Cookies from 'universal-cookie';
import {
  selectedProjectCookieName,
  defaultProjectId
} from './Utilities/SelectedProject';

// kentico cloud
import { DeliveryClient, TypeResolver } from 'kentico-cloud-delivery';

// models
import { AboutUs } from './Models/about_us';
import { Accessory } from './Models/accessory';
import { Article } from './Models/article';
import { Brewer } from './Models/brewer';
import { Cafe } from './Models/cafe';
import { Coffee } from './Models/coffee';
import { FactAboutUs } from './Models/fact_about_us';
import { Grinder } from './Models/grinder';
import { HeroUnit } from './Models/hero_unit';
import { Home } from './Models/home';
import { HostedVideo } from './Models/hosted_video';
import { Office } from './Models/office';
import { Tweet } from './Models/tweet';

const projectId = '';
const previewApiKey = '';

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

const cookies = new Cookies(document.cookies);
let currentProjectId = projectId || cookies.get(selectedProjectCookieName);
if (currentProjectId) {
  cookies.set(selectedProjectCookieName, currentProjectId, { path: '/' });
} else {
  currentProjectId = defaultProjectId;
}

const isPreview = () => previewApiKey !== '';

let Client = new DeliveryClient({
  projectId: currentProjectId,
  typeResolvers: typeResolvers,
  previewApiKey: previewApiKey,
  enablePreviewMode: isPreview()
});

const resetClient = newProjectId => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    typeResolvers: typeResolvers,
    previewApiKey: previewApiKey,
    enablePreviewMode: isPreview()
  });
  const cookies = new Cookies(document.cookies);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
};

export { Client, resetClient };
