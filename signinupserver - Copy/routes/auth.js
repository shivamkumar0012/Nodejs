const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'

const middleware = require('../middleware')

router.post('/logindoctor', (req, res) => {
    User.findOne({'hid':req.body.hid},function(err,user){
        if(!user) 
            return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        else 
            return res.status(200).json({success: true,token: generateToken(user)})
            
        
    })
    
});

// router.post('/logindoctor', (req, res) => {
//     User.findOne({'hid':req.body.hid},function(err,user){
//         if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
//         user.comparepassword(req.body.password,(err,isMatch)=>{
//             if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
//             bcrypt.compare(req.body.hphoneno, user.hphoneno, (error, match) => {
//                 if (error) res.status(500).json(error)
//                 else if (match) res.status(200).json({success: true,token: generateToken(user)})
//                 else res.status(403).json({success: false, msg: 'phoneno do not match'})
//             })
//         }
//     })
//     .catch(error => {
//         res.status(500).json(error)
//     })
// });

router.post('/signupdoctor', (req, res) => {
    
            const newUser = User({hid: req.body.hid,hname: req.body.hname,hphoneno: req.body.hphoneno, haddress: req.body.haddress, hcapacity: req.body.hcapacity,htype: req.body.htype})
            
            newUser.save()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                res.status(500).json(error)
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