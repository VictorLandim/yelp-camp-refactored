const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');
const User = require('../models/user');

const maxCommentsPerRestaurant = 3;

const seedRestaurants = [
    {
        title: "Pepe's Diner",
        image:
            'https://static1.squarespace.com/static/535e054be4b07da960fbb2b9/t/58e4da7659cc68d34c75ecbf/1491393146309/0119TDI_5900ESmallSize.jpg?format=1500w',
        description: 'Beautiful place, full of life and flavour.'
    },
    {
        title: 'Gastro DreamHouse',
        image: 'https://thimpress.com/wp-content/uploads/2018/04/41993-das-loft-sofitel-19to1.jpeg',
        description: 'Unique experience suited for everyone.'
    },
    {
        title: "Sit 'n' eat",
        image:
            'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180111140213-gucci-osteria-759.jpg',
        description: 'Just delicious.'
    },
    {
        title: "'Round the corner'",
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/07/89/a7/dd/cheap-cheap-restaurant.jpg',
        description: 'Extremely affordable restaurant.'
    },
    {
        title: 'The Wet Clam',
        image:
            'http://www.susansolo.com/wp-content/uploads/2017/03/08-maldives-hurawahli-resort-undersea-restaurant-blog(pp_w768_h512).jpg',
        description: 'Taste and admire fish.'
    },
    {
        title: "McDonald's",
        image: 'http://stocknews.com/wp-content/uploads/2017/01/mcdonalds.jpg',
        description: 'An absolute classic.'
    }
];

let seedUsers = [
    {
        name: 'Jonny Loney',
        username: 'joney@gmail.com',
        password: '123'
    },
    {
        name: 'Little Stewart III',
        username: 'stew3@gmail.com',
        password: '123'
    },
    {
        name: 'Pudding Queen',
        username: 'cholattey@gmail.com',
        password: '123'
    },
    {
        name: 'Fancy Nancy',
        username: 'fnancy1@gmail.com',
        password: '123'
    },
    {
        name: 'Doctor Monica',
        username: 'drmomo@gmail.com',
        password: '123'
    },
    {
        name: 'Officer in Duty Michael',
        username: 'michaelonly@gmail.com',
        password: '123'
    }
];

const seedComments = [
    'It it actually pretty good!',
    "Please, don't ever dine there. The food tastes like literal dog poo.",
    'Was a great bite! Yummy Yummy! 8-)',
    'Lovely little quiet place!',
    'Cheap and delicious! Just how I like it!',
    'Not amazing, honestly',
    'G8 8 M8 I R8 8/8',
    "I mean, yeah, it's nice and all but you should consider something else.",
    'Mediocre, just that.',
    'I was just fascinated by the quality of the food there!',
    'Alright I guess.'
];

const seed = async () => {
    try {
        await Restaurant.remove({});
        console.log('Restaurants removed.');

        await Comment.remove({});
        console.log('Comments removed.');

        await User.remove({});
        console.log('Users removed');

        for (const user of seedUsers) {
            const { name, username, password } = user;

            user.id = await new Promise((resolve, reject) => {
                User.register(new User({ name, username }), password, (err, user) => {
                    if (err) reject(err);
                    resolve(user._id);
                });
            });

            console.log('User created.');
        }

        for (const restaurant of seedRestaurants) {
            const userIndex = Math.floor(Math.random() * seedUsers.length);
            const user = seedUsers[userIndex];

            restaurant.author = {
                username: user.username,
                name: user.name,
                id: user.id
            };

            const createdRestaurant = await Restaurant.create(restaurant);

            const commentCount = Math.floor(Math.random() * maxCommentsPerRestaurant) + 1;

            for (let i = 0; i < commentCount; i++) {
                const commentIndex = Math.floor(Math.random() * seedComments.length);
                const content = seedComments[commentIndex];

                const createdComment = await Comment.create({ content });

                const userIndex = Math.floor(Math.random() * seedUsers.length);
                const user = seedUsers[userIndex];

                createdComment.author = {
                    username: user.username,
                    name: user.name,
                    id: user.id
                };

                const savedComment = await createdComment.save();

                createdRestaurant.comments.push(savedComment);

                await createdRestaurant.save();

                console.log('Comment created');
            }

            console.log('Restaurant created.');
        }

        console.log('Finished seeding.');
    } catch (e) {
        console.log(e);
    }
};

module.exports = seed;
