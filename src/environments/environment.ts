// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  eventServiceAddress: 'http://localhost:8079',
  registrationServiceAddress: 'http://localhost:8081',
  amplifyConfig: {
    Auth: {
      mandatorySignIn: true,
      region: "us-east-2",
      userPoolId: "us-east-2_mXUVVA54V",
      identityPoolId: "us-east-2:2aba4449-cd21-4b4e-8e77-4853359bbc87",
      userPoolWebClientId: "4f2li8a2pvtof2phakmcjmdt93"
    },
    Storage: {
      AWSS3: {
        region: "us-east-2",
        bucket: "bookit-event-images"
      }
    }
  },
  routerOptions: {
    enableTracing: false //set to true for router logging.
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
