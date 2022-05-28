const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'

const middleware = require('../middleware')



router.post('/signup', async(req, res) => {
    const newUser = User({report_id: req.body.report_id,pasanger_name: req.body.pasanger_name,pasanger_gender: req.body.pasanger_gender, pasanger_age: req.body.pasanger_age, injury_type: req.body.injury_type, mobile_number: req.body.mobile_number
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