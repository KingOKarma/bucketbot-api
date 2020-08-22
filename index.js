const express = require('express')
const Discord  = require('discord.js');
const config = require('dotenv').config().parsed;

const client = new Discord.Client();
const app = express();

app.get('/', (req, res) => {
    return res.send('Bucketbot API');
})

app.get('/bot/stats', (req, res) => {
    return res.json({
        inServers: client.guilds.cache.size,
    })
})

app.listen(config.API_PORT, () => {
    console.log('Starting the backend...')
})

client.on('ready', () => {
    console.log('Backend started!')
})

client.login(config.BOT_TOKEN);