const express = require('express')
const authRoutes = require('./auth-routes')
const chatRoutes = require('./chat-routes')
const app = express()

const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

const User = require('./user')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const cookieParser = require('cookie-parser')
const session = require('express-session')

const mongoose = require('mongoose')

const keys = require('./keys')

mongoose.connect(keys.database.link)

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(session({
    secret: 'your secret here',
    resave: false,
    saveUninitialized: true
}))

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
})

passport.use(new LocalStrategy(
{
  usernameField: 'nome',
  passwordField: 'senha'
},
    async (username, password, done) => {
      const user = await User.findOne({nome: username})
      if (!user) { return done(null, false) }
      if (password === user.senha) {
          return done(null, user)
      } else {
          return done(null, false)
      } 
    }
))

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/auth',authRoutes)

app.use('/chat',chatRoutes)

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

app.get('/',(req,res)=>{
    res.render('index')
})

const users = {}

io.on('connection',(socket) =>{
  console.log('new User')
  socket.emit('chat-message','Hello World')

  socket.on('new-user', (name) =>{
    users[socket.id] = name
    socket.broadcast.emit('user-connected',name)
  })

  socket.on('send-chat-message', (message) => {
    console.log(message)
    socket.broadcast.emit('chat-message', message)
  })
})

/* app.listen(keys.PORT, () => {
    console.log(`app now listening for requests on port ${keys.PORT}`)
}) */

server.listen(keys.PORT, () => {
  console.log(`app now listening for requests on port ${keys.PORT}`)
})