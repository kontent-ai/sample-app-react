import Cookies from 'universal-cookie';
import { selectedProjectCookieName, defaultProjectId } from './Utilities/SelectedProject';

// kentico cloud
import { DeliveryClient, TypeResolver } from 'kentico-cloud-delivery';

// models
import { AboutUs } from './Models/AboutUs';
import { Accessory } from './Models/Accessory';
import { Article } from './Models/Article';
import { Brewer } from './Models/Brewer';
import { Cafe } from './Models/Cafe';
import { Coffee } from './Models/Coffee';
import { FactAboutUs } from './Models/FactAboutUs';
import { Grinder } from './Models/Grinder';
import { HeroUnit } from './Models/HeroUnit';
import { Home } from './Models/Home';
import { HostedVideo } from './Models/HostedVideo';
import { Office } from './Models/Office';
import { Tweet } from './Models/Tweet';

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

let Client = new DeliveryClient({
  projectId: currentProjectId,
  typeResolvers: typeResolvers,
  previewApiKey: previewApiKey
});

const resetClient = (newProjectId) => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    typeResolvers: typeResolvers,
    previewApiKey: previewApiKey
  });
  const cookies = new Cookies(document.cookies);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
}

export {
  Client,
  resetClient
};
