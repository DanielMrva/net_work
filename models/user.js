const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([/da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
        
    },
    {
        toJson: {
            viturals: true,
            getters: true,
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length();
})

const User = model('User', userSchema);

module.exports = User;

/**
 * **User**:

* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**:

Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
 */
