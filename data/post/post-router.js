const express = require('express');

const db = require('../db');
const router = express.Router();

router.get('/', (req, res)=>{
    
    
    db.find(req.body)
    .then(post =>{
        res.status(200).json(post)
    })
    .catch(err=>{
       res.status(404).json({message: 'Haw Haw! '})
    })
})

router.get('/:id', (req, res)=>{
    
    db.findById(req.params.id)
    .then(post =>{
        // if(post){
        //     res.status(200).json(post)
        // }else{
        //     res.status(200).json(post)

        // }
        res.status(200).json(post)

    })
    .catch(err=>{
       res.status(404).json({error: "The posts information could not be retrieved."})
    })
})

router.post('/', (req, res)=>{

    const body= req.body

    if(!body.title || !body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(body)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(err=>{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
    }
    
})

router.post('/:id/comments', (req,res)=>{
    const id= +req.params.id
    const body = req.body
console.log('id ===>', id)
    db.findById(id) //if Id exist
    .then(post=>{
        console.log('post==>', post)
        if(post[0]){
            body.post_id = id

            db.insertComment(body)
                .then(postComment=>{
                    res.status(201).json(postComment)
                })
                .catch(err=>{
                    res.status(500).json({message: 'Something strange'})
                })
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }   
    })
    .catch(err=>{
        res.status(500).json({message: 'ERROR FINDING POST'})
    })

})

router.get('/:id/comments', (req, res)=>{
    const id= +req.params.id
    const body= req.body

    db.findPostComments(id)
    .then(comments=>{
        res.status(201).json(comments)
    })
})

router.put('/:id', (req, res)=>{
    const id= req.params.id
    const body = req.body
    // const postInfo = db.findById({id})

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }else if(!body.title || !body.contents){
res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
    db.update(id, body)
    .then(post=>{
        
        res.status(200).json(body)
    })
    .catch(err=>{
        res.status(500).json({ error: "The post information could not be modified." })
    })
}
})

router.delete('/:id', (req, res)=>{
    const id= req.params.id

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }else{
        db.remove(id)
        .then(post=>{
            res.status(200).json({ message: `Oh Yay! Id ${id}  is officially deleted` })
        })
        .catch(err=>{
            res.status(500).json({ error: "The post could not be removed" })
        })

    }
})


module.exports=router;