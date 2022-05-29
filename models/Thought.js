const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thoughts must have text content',
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate.apply(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  },
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;