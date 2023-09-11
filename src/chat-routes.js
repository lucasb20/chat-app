const router = require('express').Router()

const mongoose = require('mongoose')
const User = require('./user')

router.get('/',(req,res)=>{
    res.render('chat',{ user: req.session.user })
})

router.post('/conversa', async (req,res)=>{
    const nome = req.body.searchName

    try {
        console.log('Buscando por: ',nome)

        const user = await User.findOne({
            nome: nome
        })
        
        console.log('Conta localizada: ',user.nome)
        
        if (user) {
            res.redirect(`/chat/${user._id}`);
        } else {
            res.redirect('/chat');
            res.alert(`Usuário '${nome}' não encontrado.`)
        }
    } catch (err) {
        console.log(err)
        res.redirect('/chat')
    }
})

router.get('/:id', async (req,res)=>{
    id = req.params.id

    const user = await User.findOne({
        _id: id
    })

    res.render('directmessage',{ pessoa: user })
})

module.exports = router