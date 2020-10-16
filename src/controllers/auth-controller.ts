import { Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { IController } from '../types/controllers';
import AuthService from '../services/auth-service';

@autoInjectable()
export default class AuthController implements IController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  getInitAuthDiscordAsync = async (req: Request, res: Response): Promise<Response> => {
    const response: any = await this.authService.initAuthorize(req.query.code as string);

    if (response?.error) return res.status(401).json(response);

    return res.json(await this.authService.getCurrentUser(response.access_token));
  }

  getAuthDiscordAsync = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.authService.getCurrentUser(req.query.code as string);

    if (response?.error) return res.status(401).json(response);

    return res.json(response);
  }

  getRouter = (): Router => {
    const router = Router();

    global.authUser = this.authService.getCurrentUser;

    // Initial authentication
    router.get('/init-discord', this.getInitAuthDiscordAsync);

    // Re-authorize existing token.
    router.get('/discord', this.getAuthDiscordAsync);

    return router;
  }
}
