const { ObjectId } = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then((user) => !user ? res.status(404).json({message: 'No user with that ID'}):res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({_id:req.params.userId })
            .then((user) => 
                !user 
                    ? res.status(404).json({message: 'No user with that ID'})
                    : Thought.deleteMany({_id: { $in: user.thoughts} })
            )
            .then(() => res.json({ message: 'User and associated thoughts deleted!'}
            ))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found by that id'})
                    : res.json(user)
                )
                .catch((err) => {
                    res.status(500).json(err);
                });
    },
    makeFriend(req, res) {
        User.findOne({_id: req.params.friendId})
        .select('-__v')
        .then((friend) => !friend ? res.status(404).json({message: 'No friend found by that Id'})
        : User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId }},
            {runValidators: true, new: true})
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'No user found by that id'})
                    : User.findOneAndUpdate(
                        { _id: req.params.friendId},
                        { $addToSet: {friends: req.params.userId}},
                        { runValidators: true, new: true})
                        .then((friend) => 
                            !friend
                                ? res.status(404).json({message: 'No friend found by that Id'})
                                : res.status(200).json(friend)
                        )
                        .catch((err) => {
                            res.status(500).json(err);
                        })
            )
            .catch((err) => {
                res.status(500).json(err);
            })
        )
        .catch((err) => {
            res.status(500).json(err);
        });
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: {friends: req.params.friendId}},
            { runValidators: true, new: true})
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'No user found by that id'})
                    : User.findOneAndUpdate(
                        { _id: req.params.friendId},
                        { $pull: {friends: req.params.userId}},
                        { runValidators: true, new: true})
                        .then((friend) => 
                            !friend
                                ? res.status(404).json({message: 'No friend found with that id'})
                                : res.json(friend)
                        )
                        .catch((err) => {
                            res.status(500).json(err);
                        })
            )
            .catch((err) => {
                res.status(500).json(err);
            })
    }
}
