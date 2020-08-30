const DiscordStrategy = require("passport-discord").Strategy;
const passport = require('passport');


console.log("this is yes")

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, (accessToken, refreshToken, profile, done) => {
    console.log("yes")
    console.log(`${profile.username}#${profile.discriminator}`)
    console.log(profile.id)
    console.log(profile.guilds.length)
}))