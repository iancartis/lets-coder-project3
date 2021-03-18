const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comments");
const Feed = require("../models/feed");
const Sleep = require("../models/sleep");
const Height = require("../models/height");
const Weight = require("../models/weight");
const auth = require("../middleware/auth");






//Creates comment
commentRouter.post("/create_comment/:registerValueId", auth, async(req, res) => {
    const registerValueId = req.params.registerValueId
    console.log(req.user)
    const {
        body: { value }
    } = req;

    try {
        let newComment = new Comment({
            userId: req.user,
            value: value
        })

        const doc = await newComment.save();
        let feedFind = await Feed.findById(registerValueId)
        if (feedFind) {
            feedFind.comments.push(doc.id)
            feedFind.save();
            return res.send(doc);
        }
        let sleepFind = await Sleep.findById(registerValueId)
        if (sleepFind) {
            sleepFind.comments.push(doc.id)
            sleepFind.save();
            return res.send(doc);
        }
        let weightFind = await Weight.findById(registerValueId)
        if (weightFind) {
            weightFind.comments.push(doc.id)
            weightFind.save();
            return res.send(doc);
        }
        let heightFind = await Height.findById(registerValueId)
        if (heightFind) {
            heightFind.comments.push(doc.id)
            heightFind.save();
            return res.send(doc);
        }
        return res.status(404).send('Register not found')

    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});


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

// commentRouter.get("/comments-type/:registerType", (req, res) => {
//     const registerType = req.params.registerType.toString();
//     Comment.find({ registerType: registerType })
//         .then((comment) => {
//             if (!comment) {
//                 return res.status(400).send();
//             } else {
//                 res.send(comment);
//             }
//         })
//         .catch((error) => {
//             res.status(500).send(error.message);
//         });
// });



commentRouter.delete("/deletecomment/:id", auth, async(req, res) => {
    let id = req.params.id

    try {
        await Comment.findByIdAndRemove(id);

        let heightFind = await Height.find({ comments: id })
        if (heightFind) {
            heightFindComments = heightFind[0].comments
            let index = heightFindComments.indexOf(id)
            heightFindComments.splice(index, 1)
            await heightFind[0].save()
            return res.json('comment removed')
        }

        let weightFind = await Weight.find({ comments: id })
        if (weightFind) {
            weightFindComments = weightFind[0].comments
            let index = weightFindComments.indexOf(id)
            weightFindComments.splice(index, 1)
            await weightFind[0].save()
            return res.json('comment removed')
        }

        let sleepFind = await Sleep.find({ comments: id })
        if (sleepFind) {
            sleepFindComments = sleepFind[0].comments
            let index = sleepFindComments.indexOf(id)
            sleepFindComments.splice(index, 1)
            await sleepFind[0].save()
            return res.json('comment removed')
        }

        let feedFind = await Feed.find({ comments: id })
        if (feedFind) {
            feedFindComments = feedFind[0].comments
            let index = feedFindComments.indexOf(id)
            feedFindComments.splice(index, 1)
            await feedFind[0].save()
            return res.json('comment removed')
        }



    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update one comment

commentRouter.patch("/updatecomment/:id", auth, async(req, res) => {
    console.log(req.user)
    const {
        body: { registerId, value },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updateComment = await Comment.findByIdAndUpdate(
            filter, {
                $set: {
                    userId: req.user,
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