const router = require('express').Router()

router.get('/login',(req,res) => {
    res.send('Logging in')
})

router.get('/register',(req,res) => {
    res.send('Register in')
})

module.exports = router