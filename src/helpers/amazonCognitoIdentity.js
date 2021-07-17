import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  /* UserPoolId: 'us-east-2_ilCzxlt7f',
  ClientId: '3pngv4qtb2i72vt6un0cdkdcak', */
  UserPoolId: 'us-east-1_Rhq7ZwU3v',
  ClientId: '245h7hmef4oqbu8snophfsjd0u',
};

export const UserPool = new CognitoUserPool(poolData);
