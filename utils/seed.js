const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {generateUserGroup,  getThoughts, getRandomArrItem} = require('./data');



connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected')
    //clears our db at begining
    await User.deleteMany({});
    await Thought.deleteMany({});

    //runs our generated users
    let userGroup = generateUserGroup(10);
    //runs our generated thoughts
    let thoughts = getThoughts(15, userGroup);


    //inserts thoughts and users into DB
    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(userGroup);

    //associates thoughts with their speficied users
    for (let index = 0; index < thoughts.length; index++) {
        const element = thoughts[index];
        await Thought.findOne({thoughtText: element.thoughtText})
        .then((thought) => 
            !thought
            ? console.log('no thought found')
            : User.findOneAndUpdate(
                {userName: element.userName},
                {$addToSet: {thoughts: element._id}}
                
                )
            .then((user) => 
                !user 
                ? console.log('user no found')
                : console.log(`added ${element._id}`))
        )
        .catch((err) => console.log(err))
    }

    //loops through userGroup (at least) twice to make friends
    for (let r = 0; r < 2; r++) {
        for (let index = 0; index < userGroup.length; index++) {
            const userOne = userGroup[index];
            const userTwo = getRandomArrItem(userGroup);
            if (userOne.userName != userTwo.userName) {
                await User.findOne({userName: userOne.userName})
                        .then((user1) => 
                            !user1
                            ? console.log('no user found')
                            : User.findOneAndUpdate(
                                {userName: userTwo.userName},
                                {$addToSet: {friends: user1._id}},
                                {new: true})
                            .then((user2) => 
                                !user2
                                    ? console.log('no friend found')
                                    : User.findOneAndUpdate(
                                        {userName: userOne.userName},
                                        {$addToSet: {friends: user2._id}},
                                        {new: true}
                                    )
                            )
                        )
                        .catch((err) => console.log(err))
            }
            
        }
    }
    

    console.table(userGroup);
    process.exit(0);

});