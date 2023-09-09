const router = require('express').Router()

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/enviar',(req,res) =>{
    res.send("Logado")
})

router.get('/register',(req,res) => {
    res.render('register')
})

router.get('/recovery',(req,res) =>{
    res.send('Blz, me diz aí teu email associado a tua conta e a gente conversa.')
})

router.get('/help',(req,res) =>{
    res.send('É aquela história: Se você precisar de mim, é mesmo que nada.')
})

module.exports = router