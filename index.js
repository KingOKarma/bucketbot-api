const express = require('express')
const Discord  = require('discord.js');
const config = require('dotenv').config().parsed;

const client = new Discord.Client();
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
})

app.get('/', (req, res) => {
    return res.send('Bucketbot API');
})

app.get('/bot/stats', (req, res) => {
    return res.json({
        inServers: client.guilds.cache.size,
        memberCount: client.users.cache.size,
        supportCount: client.guilds.cache.find(guild => guild.id === "605859550343462912").memberCount,
        uptime: client.uptime,
    })
})

app.listen(config.API_PORT, () => {
    console.log('Starting the backend...')
})

client.on('ready', () => {
    console.log('Backend started!')
})

client.login(config.BOT_TOKEN);