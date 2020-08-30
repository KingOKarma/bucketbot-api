const config = require('dotenv').config().parsed;
const router = require('express').Router();
const passport = require('passport');

console.log("bruh")
router.get('/', passport.authenticate('discord'))
router.get("/redirect", passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/discord/login'
}), (req, res) => {
    console.log("wowie 200")
    res.send(200);
})
module.exports = router;

