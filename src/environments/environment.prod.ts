export const environment = {
  production: true,
  /** TODO: This address should be updated to http://bookit-event:8080 when we have a better solution for calling bookit-event from the browser */
  eventServiceAddress: ' https://glhudxfokg.execute-api.us-east-2.amazonaws.com/dev',
  
  /** TODO: This address should be updated to http://bookit-registration:8080 when we have a better solution for calling bookit-registration from the browser */
  registrationServiceAddress: 'https://glhudxfokg.execute-api.us-east-2.amazonaws.com/dev',

  cognitoLoginAddress: 'https://bookit-cog.auth.us-east-2.amazoncognito.com/login?client_id=4sv94558nmhl59ba03ugc3en7j&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=https://d15qel4agj6okz.cloudfront.net/events'
};
