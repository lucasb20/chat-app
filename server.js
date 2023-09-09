const express = require('express')
const authRoutes = require('./auth-routes')
const chatRoutes = require('./chat-routes')
const app = express()

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose')

const keys = require('./keys')

mongoose.connect(keys.database.link)

app.use(express.urlencoded({ extended: true }))

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ))

const loginSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User', loginSchema)

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(keys.PORT, () => {
    console.log(`app now listening for requests on port ${keys.PORT}`)
})
