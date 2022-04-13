import { generateModelsAsync } from '@kentico/kontent-model-generator';

generateModelsAsync({
  sdkType: 'delivery',
  projectId: '975bf280-fd91-488c-994c-2f04416e5ee3',
  addTimestamp: true,
  elementResolver: 'camelCase',
}).then(() => {
  console.log("ok")
})

export {}
