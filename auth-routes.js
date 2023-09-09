const router = require('express').Router()

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/enviar',(req,res) =>{
    res.send("Logado")
})

router.get('/register',(req,res) => {
    res.send('Register in')
})

module.exports = router