export const environment = {
  production: true,
  /** TODO: This address should be updated to http://bookit-event:8080 when we have a better solution for calling bookit-event from the browser */
  eventServiceAddress: ' https://glhudxfokg.execute-api.us-east-2.amazonaws.com/dev',
  
  /** TODO: This address should be updated to http://bookit-registration:8080 when we have a better solution for calling bookit-registration from the browser */
  registrationServiceAddress: 'https://glhudxfokg.execute-api.us-east-2.amazonaws.com/dev',

  amplifyConfig: {
    Auth: {
      mandatorySignIn: true,
      region: "us-east-2",
      userPoolId: "us-east-2_KUMXtWpvb",
      identityPoolId: "us-east-2:2aba4449-cd21-4b4e-8e77-4853359bbc87",
      userPoolWebClientId: "2dqa1qlukcih903or7doql7622"
    }
  }
};
