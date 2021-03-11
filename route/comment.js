const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comments");

//Creates comment
commentRouter.post("/create_comment", async(req, res) => {
    const {
        body: { userId, registerId, value, registerType },
    } = req;
    let newComment = new Comment({
        userId: userId,
        registerId: registerId,
        value: value,
        registerType: registerType

    });

    try {
        const doc = await newComment.save();
        res.send(doc);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

// commentRouter.findOne({})
//     .populate('baby').exec((err, posts) => {
//         console.log("Populated Comment " + posts);
//     })

//Get all the comments
commentRouter.get("/comments", (req, res) => {
    Comment.find({}, function(err, comments) {
        if (err) console.log(`There's been an error: ${err.message}`);
        res.send(comments);
    }).populate("userId registerId babyId");
});

//Find one comment
commentRouter.get("/comments/:id", (req, res) => {
    const _id = req.params.id;
    Comment.findById(_id)
        .then((comment) => {
            if (!comment) {
                return res.status(400).send();
            } else {
                res.send(comment);
            }
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

//Find comments por tipo de registro 

commentRouter.get("/comments-type/:registerType", (req, res) => {
    const registerType = req.params.registerType.toString();
    Comment.find({ registerType: registerType })
        .then((comment) => {
            if (!comment) {
                return res.status(400).send();
            } else {
                res.send(comment);
            }
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

//Delete one comment
commentRouter.delete("/deletecomment/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Comment.findByIdAndRemove(_id);

        res.send(doc, "Comment deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update one comment

commentRouter.patch("/updatecomment/:id", async(req, res) => {
    const {
        body: { userId, registerId, value },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updateComment = await Comment.findByIdAndUpdate(
            filter, {
                $set: {
                    userId: userId,
                    registerId: registerId,
                    value: value
                }
            }
        );
        res.send(updateComment);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});



module.exports = commentRouter;