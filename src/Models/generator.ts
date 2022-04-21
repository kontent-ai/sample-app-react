import { generateModelsAsync } from '@kentico/kontent-model-generator';

generateModelsAsync({
  sdkType: 'delivery',
  projectId: 'da5abe9f-fdad-4168-97cd-b3464be2ccb9',
  addTimestamp: true,
  elementResolver: 'camelCase',
}).then(() => {
  console.log("ok")
})

export {}
