const router = require('express').Router()

const mongoose = require('mongoose')
const User = require('./user')
const passport = require('passport')

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/enviar', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) { return res.redirect('/auth/login') }
        req.logIn(user, function(err) {
            if (err) { return next(err) }
            req.session.user = user
            return res.redirect('/chat')
        })
    })(req, res, next);
})

router.post('/criar', async (req,res) =>{
    const nome = req.body.nome
    const senha = req.body.senha

    try {
        const user = await User.create({
            nome: nome,
            senha: senha,
        });

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