// const connection = require('../config/connection');
// const { User, Thought } = require('../models');
// const { getRandomUser, getRandomEmail, randomText } = require('./data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connected')

//     await User.deleteMany({});
//     await Thought.deleteMany({});

//     const users = [];

//     for (let i = 0; i < 20; i++) {
//         let userName = getRandomUser();
//         let email = getRandomEmail();
//     }
// });