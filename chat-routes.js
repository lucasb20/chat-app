const router = require('express').Router()

router.get('/teste',(req,res)=>{
    res.send('Cavalo')
})

module.exports = router