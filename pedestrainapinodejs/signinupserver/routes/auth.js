const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'

const middleware = require('../middleware')



router.post('/signup', async(req, res) => {
    const newUser = User({report_id: req.body.report_id,pedestrain_name: req.body.pedestrain_name,pedestrain_gender: req.body.pedestrain_gender, pedestrain_age: req.body.pedestrain_age, injury_type: req.body.injury_type, mobile_number: req.body.mobile_number
        , nationality: req.body.nationality, address: req.body.address, nomanee: req.body.nomanee
        , accident_reason: req.body.accident_reason})
        try{
            const a1 =  await newUser.save() 
            res.json({success: true})
        }catch(err){
            res.send({success: false})
        }

});




module.exports = router