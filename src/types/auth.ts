/* eslint-disable camelcase */

// oauth2 authorization return
type oAuthAuthorize = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  token_type: string
}

// Type used for return of function <getCurrentUser>
type oAuthMember = {
  id: string,
  username: string,
  avatar: string,
  discriminator: string,
  email: string,
  verified: boolean,
  premium_type: number
}

type authMember = {
  ID: string;
  accessToken: string;
  Email: string;
  AvatarHash: string,
  ProfileURL: string,
  Username: string,
}

type oAuthMemberError = {
  message: string,
  code: number
}
