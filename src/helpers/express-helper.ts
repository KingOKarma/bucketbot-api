/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const expressHelper = {
  /**
   * Headers needed to allow reqeusts to be made, e.g. disable CORS etc...
   * @param req Request from Express To get needed data from request
   * @param res Response from Express to give a response if needed.
   * @param next NextFunction from Express to continue the request
   */
  init(app: any): void {
    // Formatting data & CORS
    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Middleware
    app.use(this.headers);

    app.use(this.authenticate);
  },

  /**
   * Headers needed to allow reqeusts to be made, e.g. disable CORS etc...
   * @param req Request from Express To get needed data from request
   * @param res Response from Express to give a response if needed.
   * @param next NextFunction from Express to continue the request
   */
  async headers(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    console.log(`${req.method} - ${req.url}\n`);
    return next();
  },

  /**
   * Middleware used to authenticate the requests and
   * to make sure the user is allowed to run said request.
   * @param req Request from Express To get needed data from request
   * @param res Response from Express to give a response if needed.
   * @param next NextFunction from Express to continue the request
   */
  async authenticate(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    if (req.url.startsWith('/auth/') || req.url.startsWith('/application/')) {
      // URL Starts with /auth/ AKA is authorizing / logging in.
      return next();
    }

    const authCode = req.header('Authorization');

    if (!authCode) {
      return expressHelper.unauthorizedError(res);
    }

    const authUser = await global.authUser(authCode)
      .then((user) => user)
      .catch((err) => err);

    if (authUser?.error) {
      return expressHelper.unauthorizedError(res);
    }

    req.user = authUser.member;

    return next();
  },

  /**
   * Unauthorized error, if the user is not allowed to run said request return this.
   * @param res Response from Express to give a response if needed.
   */
  async unauthorizedError(res: Response): Promise<Response> {
    return res.status(401)
      .json({
        status: 401,
        message: 'Unauthorized',
      });
  },
};

export default expressHelper;
