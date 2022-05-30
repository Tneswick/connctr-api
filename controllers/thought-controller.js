const { Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err); // for debug and production purposes only, remove for frontend security
      })
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  createThought({ body }, res) {
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  reactToThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true, runValidators: true })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  deleteReaction({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: body.reactionId } } }, { new: true })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }
}

module.exports = thoughtController;
