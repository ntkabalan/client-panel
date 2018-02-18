// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAXejjSLDcPw0aUPUjCdHhL5YEHE4EsW8I",
    authDomain: "client-panel-production.firebaseapp.com",
    databaseURL: "https://client-panel-production.firebaseio.com",
    projectId: "client-panel-production",
    storageBucket: "client-panel-production.appspot.com",
    messagingSenderId: "881258900622"
  }
};