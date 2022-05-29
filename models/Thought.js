const { Schema, model } = require('mongoose');
// import the getter function for date formatting
// import reactionSchema???

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
      get: console.log('NOT DONE'),// getter for formatting of the date upon query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // correct?????
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    }
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;