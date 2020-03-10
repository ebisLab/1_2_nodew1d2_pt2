const express= require('express');
const postRouter = require('../post/post-router')
const server = express();
server.use(express.json())
server.get('/', (req, res)=>{
    res.status(200).json({successful: 'Welcome to the blog!!'})
})

server.use('/api/posts', postRouter)
module.exports=server;