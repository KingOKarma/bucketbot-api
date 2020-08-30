const express = require('express')
const Discord  = require('discord.js');
const config = require('dotenv').config().parsed;
const ms = require('ms')
const oauth = require('./routes/auth.js')
const client = new Discord.Client();
const app = express();
const passport = require('passport');
const session = require('express-session')
const discordStrategy = require("./routes/stratagies/discordstrategy");
const db = require('./database/database');

db.then(() => console.log('Connected to MongoDB.')).catch(err => console.log(err))

//Routes
const authRoute = require('./routes/auth');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
})

app.use(session({
    secret: 'KarmaIsKaine',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}));


//Passport
app.use(passport.initialize())
app.use(passport.session());


//middleware Routes
app.use('/auth' , authRoute)

app.get('/', (req, res) => {
    return res.send('Bucketbot API');
})


app.get('/discord', (req, res) => {
    return res.redirect(config.DISCORD_LOGIN_URL)

})

app.get('/discord/login', (req, res) => {
    
    return res.send("Logged in")

})

app.get('/bot/stats', (req, res) => {
    

    return res.json({
        inServers: client.guilds.cache.size,
        memberCount: client.users.cache.size,
        supportCount: client.guilds.cache.find(guild => guild.id === "605859550343462912").memberCount,
        uptime: ms(client.uptime, {long: true})
    })
})

app.listen(config.API_PORT, () => {
    console.log('Starting the backend...')
})

client.on('ready', () => {
    console.log('Backend started!')
})

client.login(config.BOT_TOKEN);