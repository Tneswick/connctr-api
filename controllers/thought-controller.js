const { Thought } = require('../models/Thought');

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
        res.status(400).json(err); // for debug and production purposes only, remove for frontend security
      })
  },

  createThought({ body }, res) { // PUSH THE THOUGHT'S ID TO THE ASSOCIATED USER'S THOUGHTS ARRAY FIELD
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err); // for debug and production purposes only, remove for frontend security
    })
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err); // for debug and production purposes only, remove for frontend security
      })
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err); // for debug and production purposes only, remove for frontend security
    })
  }

}

module.exports = thoughtController;
