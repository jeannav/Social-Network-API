const { Schema, model, DataTypes } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      allowNull: false,
      unique: true,
      // help with: Must match a valid email address (look into Mongoose's matching validation)
      match: [/.+@.+\..+/, "Please enter a valid email."],
    },
      // help with: Array of _id values referencing the Thought model
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought"
        }
      ],
      // help with: Array of _id values referencing the User model (self-reference)
      friends: [ 
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ],
  },
   {
     toJSON: {
       virtuals: true,
     },
  }
  
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;
