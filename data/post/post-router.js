const express = require('express');

const db = require('../db');
const router = express.Router();

router.get('/', (req, res)=>{
    // console.log(req, 'req')
    // res.status(200).json({successful: 'Its working!'})
    db.find(req.body)
    .then(post =>{
        if (post){
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'Haw Haw! '})

        }
    })
})
module.exports=router;