const router = require('express').Router()

router.get('/login',(req,res) => {
    res.send('Logging in')
})

module.exports = router