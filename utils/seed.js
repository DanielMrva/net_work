const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {getRandomUser, getRandomEmail, generateUserGroup, getRandomArrItem, getThoughts, randomText, getReactions} = require('./data');

const thoughtAssociator = function(text, user){
    Thought.findOne({thoughtText: text})
        .then((thought) => 
            !thought
                ? console.log(`could not find ${thought}`)
                : User.findOneAndUpdate(
                {userName: thought.userName},
                {$addToSet: {thoughts: thought._id}},
                {runValidators: true, new: true}
            )
            .then((user) => console.log(user))
        )
        .catch((err) => console.log(err));
};

const thoughtAssociate = async function(text){
    const thought = await Thought.findOne({thoughtText: text})
    if (!thought) {
        console.log('could not find thought')
    } else {
        const user = await User.findOneAndUpdate(
            {userName: thought.userName},
            {$addToSet: {thoughts: thought._id}},
            {runValidators: true, new: true}
        )
        console.log(user);
    }
}


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected')

    await User.deleteMany({});
    await Thought.deleteMany({});

    let userGroup = generateUserGroup(10);

    let thoughts = getThoughts(10, userGroup);


    
    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(userGroup);

    async function associateThoughts(thoughts) {
        for (let index = 0; index < thoughts.length; index++) {
            const text = thoughts[index].thoughtText;
            const user = thoughts[index].userName;
            thoughtAssociator(text);
        }
    }
    await associateThoughts(thoughts);
    console.table(userGroup);
    process.exit(0);

});