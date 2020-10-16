import { autoInjectable, inject } from 'tsyringe';
import axios from 'axios';
import * as qs from 'qs';
import { Client, User } from 'discord.js';

@autoInjectable()
export default class AuthService {
  config: Config;

  bot: Client;

  constructor(@inject('Config') config: Config, @inject('Bot') bot: Client) {
    this.config = config;
    this.bot = bot;
  }

  /**
   * Authorize with token returned from application authorization
   * @param code token put in URL as query string
   */
  initAuthorize = async (code: string): Promise<unknown> => axios({
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      client_id: this.config.discord.oAuth.clientID,
      client_secret: this.config.discord.oAuth.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.config.discord.oAuth.redirectURL,
      scope: this.config.discord.oAuth.scopes.join(' '),
    }),
    url: 'https://discord.com/api/v6/oauth2/token',
  })
    .then((response) => response.data)
    .catch((err) => err.response.data);

  /**
   * Re-authorize with token returned from api/v6/oauth2/token
   * @param accessKey Discord token to authorize
   */
  getCurrentUser = async (accessKey: string): Promise<{ member?: authMember, error?: oAuthMemberError}> => this.createDiscordRequest(accessKey, '/users/@me')
    .then((data: oAuthMember) => this.getDiscordUser(data.id)
      .then((discordMember) => ({
        member: {
          accessToken: accessKey,
          ID: data.id,
          Email: data.email,
          AvatarHash: data.avatar,
          ProfileURL: discordMember.avatarURL(),
          Username: `${discordMember.username}#${discordMember.discriminator}`,
        },
      })))
    .catch((err) => ({
      error: err.response.data,
    }))

  /**
   * Create default api/v6 discord GET request
   * @param accessKey is discord oAuth token
   * @param path Specify the path to get certain data.
   */
  createDiscordRequest = async (accessKey: string, path: string): Promise<unknown> => axios.get(`https://discord.com/api/v6${path}`, {
    headers: {
      Authorization: `Bearer ${accessKey}`,
    },
  }).then((response) => response.data)

  /**
   * Get user data without being in the same guild as user.
   * @param ID Discord member snowflake ID
   */
  getDiscordUser = async (ID: string): Promise<User> => this.bot.users.fetch(ID)
    .then((user) => user)
    .catch((err) => err)
}
