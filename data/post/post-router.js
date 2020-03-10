const express = require('express');

const Post = require('../post/post-router');
const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({successful: 'Its working!'})
})
module.exports=router;