const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'

const middleware = require('../middleware')



router.post('/signup', async(req, res) => {
    
            const newUser = User({report_id: req.body.report_id,vehicle_category: req.body.vehicle_category,hit_run: req.body.hit_run, vehicle_number: req.body.vehicle_number, vehicle_type: req.body.vehicle_type, drink: req.body.drink
                , cell_phone: req.body.cell_phone, vehicle_Speed: req.body.vehicle_Speed, license_No: req.body.license_No
                , license_issue_date: req.body.license_issue_date, license_expiry_date: req.body.license_expiry_date})
                try{
                    const a1 =  await newUser.save() 
                    res.json({success: true})
                }catch(err){
                    res.send({success: false})
                }
        

});


// router.get('/:id', async(req,res) => {
//     try{
//         console.log(User)
//         const aliens = await User.find()
//         console.log(aliens)
//         const alien = await aliens.find(req.params.id)
//         res.json(alien)
//     }catch(err){
//         res.send('Error ' + err)
//     }
// })

// router.get('/:id', async (req, res) => {
//     const userResult = await User.find({report_id: req.params.id }).exec();
//     res.json({
//     //  errno: 0,
//      data: userResult[0]['vehicle_category']
//     })
//     console.log(userResult)
// })

router.get('/:id', async (req, res) => {
    const userResult = await User.find({report_id: req.params.id }).exec();
    res.json({
     errno: 0,
     data: userResult
    })
    // console.log(userResult)
})



// router.post('/', async (req, res) => {
//     const userResult = await User.find({report_id: req.body.report_id}).exec();
//     res.json({
//      errno: 0,
//      data: userResult
//     })
// })

module.exports = router