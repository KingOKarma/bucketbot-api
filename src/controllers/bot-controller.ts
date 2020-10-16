import { Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { IController } from '../types/controllers';
import StatsService from '../services/stats-service';

@autoInjectable()
export default class BotController implements IController {
  statsService: StatsService;

  constructor(statsService: StatsService) {
    this.statsService = statsService;
  }

  /**
   * Get global bot statistics
   * @param req
   * @param res
   */
  getGlobalBotStats = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.statsService.globalStatistics();

    return res.json(response);
  }

  getRouter = (): Router => {
    const router = Router();

    // Get all boring global stats from BucketBot
    router.get('/stats', this.getGlobalBotStats);

    return router;
  }
}
