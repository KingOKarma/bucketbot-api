declare namespace NodeJS {
  interface Global {
    authUser: (accessKey: string) => Promise<{ member?: authMember, error?: oAuthMemberError}>;
  }
}

declare namespace Express {
  interface Request {
    user: authMember
  }
}
