const router = require('express').Router()

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/enviar',(req,res) =>{
    res.send("Logado")
})

router.post('/criar', async (req,res) =>{
    const nome = req.body.nome
    const senha = req.body.senha

    try {
        const user = await User.create({
            nome: title,
            senha: senha,
        });
        console.log(user)

        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
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