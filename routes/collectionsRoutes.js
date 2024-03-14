const express = require('express')
const db = require('../database/connection')

const router = express.Router()


router.get('/posts', async (req, res) => {
    const user = await db.collection('posts').find().toArray();
    res.send(user);
});

router.get('/posts/:no_post', async (req, res) => {
    const user = await db.collection('posts').find({ "no_post": parseInt(req.params.no_post) }).toArray();
    res.send(user);
});


router.get('/posts/oid/:oid', async (req, res) => {
    const user = await db.collection('posts').find({ "_id": new ObjectId(req.params.oid) }).toArray();
    res.send(user);
});

router.post('/posts', async function (req, res) {
    const newPost = {
        "no_post": getRandomArbitrary(1500, 10000),
        "title": req.body.title,
        "author": req.body.author,
        "content": req.body.content,
        "image": req.body.image,
        "created_at": req.body.created_at,
        "category": req.body.category,
    };
    const result = await db.collection("posts").insertOne(newPost);
    res.send(result);
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

router.delete('/posts/:no_post', async (req, res) => {
    try {
        const pos = db.collection("posts")
        const result = await pos.findOneAndDelete({ "no_post": parseInt(req.params.no_post) });
        if (result)
            res.send("Post deleted...")
        else
            res.send("Post not found...")
    } catch (error) {
        console.log(error)
    }

});

router.patch('/posts', async (req, res) => {
    try {
        const pos = db.collection("posts")
        const result = await pos.findOneAndUpdate({ "no_post": req.body.no_post }, { $set: req.body });
        if (result) {
            res.send(result)
        } else {
            res.send("User not found..." + req.body.no_post)
        }
    } catch (e) {
        console.log(e)
    }

});

router.get('/comments', async (req, res) => {
    const orden = await db.collection('orden').find().toArray();
    res.send(orden);
});

router.get('/comments/:no_comment', async (req, res) => {
    const user = await db.collection('comments').find({ "no_comment": parseInt(req.params.id) }).toArray();
    res.send(user);
});

router.get('/comments/oid/:oid', async (req, res) => {
    const user = await db.collection('comments').find({ "_id": new ObjectId(req.params.oid) }).toArray();
    res.send(user);
});

router.post('/comments', async function (req, res) {
    const newComment = {
        "no_comment": req.body.no_comment,
        "commenter": req.body.commenter,
        "comment": req.body.comment,
        "created_at": req.body.created_at,
        "no_post": req.body.no_post
    };
    const result = await db.collection("comments").insertOne(newComment);
    res.send(result);
});

router.delete('/comments/:no_comment', async (req, res) => {
    try {
        const com = db.collection("comment")
        const result = await com.findOneAndDelete({ "no_comment": parseInt(req.params.no_comment) });
        if (result)
            res.send("Comment deleted...")
        else
            res.send("Comment not found...")
    } catch (error) {
        console.log(error)
    }

});

router.patch('/comments', async (req, res) => {
    try {
        const com = db.collection("comments")
        const result = await com.findOneAndUpdate({ "no_comment": req.body.no_comment }, { $set: req.body });
        if (result) {
            res.send(result)
        } else {
            res.send("Comment not found..." + req.body.no_comment)
        }
    } catch (e) {
        console.log(e)
    }

});


module.exports = router