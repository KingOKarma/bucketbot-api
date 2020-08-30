const DiscordStrategy = require("passport-discord").Strategy;
const passport = require('passport');
const DiscordUser = require('../../models/DiscordUser');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id)
    if(user) 
        done(null, user);

})


console.log("this is yes")

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, async (accessToken, refreshToken, profile, done) => {
    try {
    const user = await DiscordUser.findOne({discordId: profile.id});
    if(user) {
        done(null, user)
    }else{
        const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username
        });
        const saveUser = await newUser.save()
        done(null, saveUser);
    }
    }
    catch(err) {
        console.log(err)
        done(err, null)
    }
}))