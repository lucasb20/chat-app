const express = require('express')
const authRoutes = require('./auth-routes')
const chatRoutes = require('./chat-routes')
const app = express()

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/auth',authRoutes)

PORT = 3000

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`app now listening for requests on port ${PORT}`)
})
