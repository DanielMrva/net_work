const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 12,
      min: 2
    }
});

const randomText = () => {
    const rndInt = Math.floor((Math.random() * 3) + 1) ;
    return lorem.generateSentences(rndInt);
};


const names = [
    'Narwal',
    'Vine',
    'Clever',
    'Dude',
    'Bro',
    'Musk',
    'Elon',
    'Alonzo',
    'Volcano',
    'Unicorn',
    'IceCream',
    'Monster',
    'Aqua',
    'Viking',
    'Professor',
    'AeyBeeSea',
    'Airman',
    'Wizard',
    'Barbarian',
    'Werewolf',
    'Finnish',
    'Slimy',
    'Medusa',
    'Worm',
    'Jones',
    'Coollastname',
    'Ostrich',
    'Ze',
    'Zechariah',
    'Zeek',
    'Dog',
    'Excited',
    'Sock',
    'Box',
    'Zen',
    'Zenith',
    'Zennon',
    'Zeph',
    'Blob',
    'Monkey',
    'Zhi',
    'Zhong',
    'Zion',
    'Fox',
    'Zuriel',
    'Xander',
    'Jared',
    'Grace',
    'Alex',
    'Bibliophile',
    'Wonderer',
    'Smile',
    'Sarah',
    'HotDog',
    'Parker',
    'Smelt',
    'Lightning',
    'Robot',
    'Minion',
    'Kangaroo',
    'Captain',
    'Doctor',
    'Jackson',
    'Polluck',
    'John Q',
    'Public',
    'Taxpayer',
    'Astronaut',
    'Superman',
    'Batman',
    'WonderTwin',
    'Wombat',
    'Turtle',
    'Sphere',
    'Charizard',
    'Faux',
    'Fox',
    'Faulty',
    'Friendly',
    'Fast',
    'Slow',
    'Servile',
    'Scrumptious',
    'Crumpet',
    'Queen',
    'King',
    'Fisher',
    'Destoryer',
    'Frenchman',
    'Rus',
    'Victor',
    'Davis',
    'Smiley',
    'Guy',
    'Gal',
    'Dame',
    'Judy',
    'Trench',
    'Bucket',
    'Slob',
    'Vile',
    'Vermin',
    'Maggie',
    'Thatcher'
  ];

const email = [
    '@gmail.com',
    '@ilstu.edu',
    '@aol.com',
    '@usgs.gov',
    '@dhs.gov',
    '@cu.edu',
    '@iu.edu',
    '@yahoo.com',
    '@hotmail.com',
    '@msn.com',
    '@comast.net',
    '@live.com',
    '@free.fr',
    '@gmx.de',
    '@web.de',
    '@outlook.com',
    '@att.net',
    '@shaw.ca',
    '@juno.com',
    '@mac.com'
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomEmail = () => {
    return `${getRandomArrItem(names)}.${getRandomArrItem(names)}${getRandomArrItem(email)}`
};

const getRandomUser = () => {
    return `${getRandomArrItem(names)} ${getRandomArrItem(names)}`
};

const generateUserGroup = (int) => {
    const userGroup = [];
    for (let i = 0; i < int; i++) {
        userGroup.push(
            {
                userName: getRandomUser(),
                email: getRandomEmail(),
            }
        )
    } 

    return userGroup;
};

const getThoughts = (int, userGroup) => {
    const thoughts = [];
    for (let i = 0; i < int; i++) {
        const randomInt = (Math.floor(Math.random() * 4));
        thoughts.push({
            thoughtText: randomText(),
            userName: getRandomArrItem(userGroup).userName,
            reactions: getReactions(randomInt, userGroup)
        })
    } 

    return thoughts;
};

const getReactions = (int, userGroup) => {
    const reactions = [];
    for (let i = 0; i < int; i++) {

        reactions.push({
            reactionBody: randomText(),
            userName: getRandomArrItem(userGroup).userName,

        })
    } return reactions;
};



module.exports = {getRandomUser, getRandomEmail, generateUserGroup, getRandomArrItem, getThoughts, randomText, getReactions}
  


