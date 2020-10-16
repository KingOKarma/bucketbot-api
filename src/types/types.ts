type Config = {
  expressPort: number,
  mongoUrl: string,
  discord: {
    token: string,
    oAuth: {
        clientID: string,
        clientSecret: string,
        redirectURL: string,
        scopes: string[]
    }
  }
}
