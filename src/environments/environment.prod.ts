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
      userPoolId: "",
      identityPoolId: "",
      userPoolWebClientId: ""
    }
  }
};
