const { Schema, Types, model } = require('mongoose');
const {dateFormater} = require('../utils/utils');
const reaction = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: dateFormater,
        },
        userName: {
            type: String,
            required: true,
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// thoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length();
// })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

/****Thought**:

* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

**Schema Settings**:

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query. */

/**Reaction (SCHEMA ONLY)

reactionId

Use Mongoose's ObjectId data type
Default value is set to a new ObjectId
reactionBody

String
Required
280 character maximum
username

String
Required
createdAt

Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query */
