import { Client } from 'discord.js';
import * as ms from 'ms';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export default class StatsService {
  bot: Client

  config: Config;

  constructor(@inject('Config') config: Config, @inject('Bot') client: Client) {
    this.config = config;
    this.bot = client;
  }

  /**
   * Get bot statistics
   * @param member oAuthMember stored in request.
   */
  async globalStatistics(): Promise<globalBotStatistics> {
    const supportServer = this.bot.guilds.cache.find((guild) => guild.id === '605859550343462912');

    return {
      uptime: ms(this.bot.uptime, { long: true }),
      servers: this.bot.guilds.cache.size,
      members: this.bot.users.cache.size,
      support: {
        members: supportServer.memberCount,
      },
    };
  }
}
