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
});

router.post('/:id/comments', (req, res) => {
    id = req.params.id;
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else db.insertComment(req.body)
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else res.status(201).send(comment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the comment to the database." })
        })
});

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
});

router.get('/:id/comments', (req, res) => {
    id = req.params.id;
    db.findPostComments(id)
        .then(comments => {
            if (comments.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else res.status(200).send(comments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
});

router.delete('/:id', (req, res) => {
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
        });

    db.remove(id)
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post could not be removed." })
        })
});

router.put('/:id', (req, res) => {
    id = req.params.id;
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    
    else {
        db.update(id, req.body)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else res.status(200).send(req.body);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
});

module.exports = router;