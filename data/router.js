const express = require('express');
const db = require('./db');
const router = express.Router();

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else db.insert(req.body)
        .then(post => {
            res.status(201).send(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
})

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
    
});

router.get('/:id', (req, res) => {
    id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else res.status(200).send(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

module.exports = router;