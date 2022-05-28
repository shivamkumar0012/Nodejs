const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'

const middleware = require('../middleware')

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email,phoneno: req.body.phoneno})
    .then(user => {
        console.log({email: req.body.email})
        if(!user) res.status(404).json({success: false, msg: 'no user with that email found'})
        else {
            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({success: true,token: generateToken(user)})
                else res.status(403).json({success: false, msg: 'password do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json({msg: "Enter all field"})
        else {
            const newUser = User({email: req.body.email,phoneno: req.body.phoneno, password: hash, cpassword: req.body.cpassword})
            newUser.save()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                res.status(500).json(error)
            })
        }
    })

});

router.get('/jwt-test', middleware.verify, (req,res) => {
    res.status(200).json(req.user)
})

router.get('/pass/:id', async(req,res) => {
    try{
           const user = await User.findById(req.params.id)
           res.json(user.cpassword)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const user = await User.findById(req.params.id)
           res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})


function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}
module.exports = router