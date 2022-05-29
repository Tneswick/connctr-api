const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'You must enter a username',
      trim: true,
    },
    email: {
      type: String,
      required: 'You must enter a valid email address',
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
      {
        type: Schema.types.ObjectId,
        ref: 'Thought',
      }
    ],
    friends: [
      {
        type: Schema.types.ObjectId,
        ref: 'User',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;