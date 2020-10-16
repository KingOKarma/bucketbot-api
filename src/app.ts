import 'reflect-metadata';

import * as express from 'express';
import { container } from 'tsyringe';
import * as Discord from 'discord.js';
import { IController } from './types/controllers';
import ConfigService from './services/config-service';
import ExpressHelper from './helpers/express-helper';

// Controllers
import AuthenticationController from './controllers/auth-controller';
import BotController from './controllers/bot-controller';

// Entry point for the app.
const mainAsync = async () => {
  const app = express();
  const bot = new Discord.Client();

  // Initialize config
  const config = new ConfigService<Config>().loadConfigFromPath('./config.json');

  container.register<Config>('Config', { useValue: config });
  container.register<Discord.Client>('Bot', { useValue: bot });

  ExpressHelper.init(app);

  // Attach controllers
  app.use('/auth', container.resolve<IController>(AuthenticationController).getRouter());
  app.use('/application', container.resolve<IController>(BotController).getRouter());

  app.listen(config.expressPort, () => {
    console.log('[Express] Starting...');
  });

  // Initliaze Discord Bot

  bot.on('ready', () => {
    console.log(`[Discord] Back-end running! port: ${config.expressPort} - Bot Ready!`);
  });

  bot.login(config.discord.token);
};

mainAsync();
