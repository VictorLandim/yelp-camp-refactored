const faker = require('faker');
const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');
const User = require('../models/user');

const maxCommentsPerRestaurant = 6;

const seedUsers = [];
const seedRestaurants = [
    {
        title: "Marios's Best",
        image:
            'https://image.newyorkupstate.com/home/nyup-media/width620/img/restaurants/photo/2017/05/01/chefs-restaurantjpg-089f673e1be65d82.jpg',
        description: "The best pasta you'll ever eat! " + faker.lorem.paragraphs(),
        location: 'Rome, Italy',
        lat: 41.894802,
        lng: 12.4853384,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: "Pepe's Diner",
        image:
            'https://static1.squarespace.com/static/535e054be4b07da960fbb2b9/t/58e4da7659cc68d34c75ecbf/1491393146309/0119TDI_5900ESmallSize.jpg?format=1500w',
        description: 'Beautiful place, full of life and flavour. ' + faker.lorem.paragraphs(),
        location: 'Lisbon, Portugal',
        lat: 40.033265,
        lng: -7.8896263,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: 'Gastro DreamHouse',
        image: 'https://thimpress.com/wp-content/uploads/2018/04/41993-das-loft-sofitel-19to1.jpeg',
        description: 'Unique experience suited for everyone. ' + faker.lorem.paragraphs(),
        location: 'Paris, France',
        lat: 48.8566101,
        lng: 2.3514992,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: "Sit 'n' eat",
        image:
            'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180111140213-gucci-osteria-759.jpg',
        description: 'Just delicious. ' + faker.lorem.paragraphs(),
        location: 'Budapest, Hungary',
        lat: 47.1817585,
        lng: 19.5060937,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: 'Round the corner',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/07/89/a7/dd/cheap-cheap-restaurant.jpg',
        description: 'Extremely affordable restaurant. ' + faker.lorem.paragraphs(),
        location: 'Jarkta, Indonesia',
        lat: -4.7993356,
        lng: 114.5632032,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: 'The Wet Clam',
        image:
            'http://www.susansolo.com/wp-content/uploads/2017/03/08-maldives-hurawahli-resort-undersea-restaurant-blog(pp_w768_h512).jpg',
        description: 'Taste and admire fish. ' + faker.lorem.paragraphs(),
        location: 'Dubai, United Arab Emirates',
        lat: 25.0750095,
        lng: 55.1887609,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: "McDonald's",
        image: 'http://stocknews.com/wp-content/uploads/2017/01/mcdonalds.jpg',
        description: 'An absolute classic. ' + faker.lorem.paragraphs(),
        location: 'Chicago, USA',
        lat: 41.8755546,
        lng: -87.6244212,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: "Mr Tokugaya's Stand",
        image: 'https://s3-media2.fl.yelpcdn.com/buphoto/1RDz8eZ2QjGWTnInuExDwQ/o.jpg',
        description: 'Traditional japanese placec. ' + faker.lorem.paragraphs(),
        location: 'Tokyo, Japan',
        lat: 34.6968642,
        lng: 139.4049033,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    },
    {
        title: '4 figure bill',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/e/e7/Munich_-_A_fancy_and_very_kitsch_dinner_table_-_5066.jpg',
        description: 'Wow, very very very fancy! ' + faker.lorem.paragraphs(),
        location: 'Paris, France',
        lat: 48.8566101,
        lng: 2.3514992,
        createdAt: faker.date.past(),
        price: faker.commerce.price()
    }
];

const seedRandom = async () => {
    try {
        await Restaurant.remove({});
        console.log('Restaurants removed.');

        await Comment.remove({});
        console.log('Comments removed.');

        await User.remove({});
        console.log('Users removed');

        for (let i = 0; i < 10; i++) {
            const user = {
                name: faker.name.firstName() + ' ' + faker.name.lastName(),
                username: faker.internet.email(),
                password: '123'
            };

            const { name, username, password } = user;

            user.id = await new Promise((resolve, reject) => {
                User.register(new User({ name, username }), password, (err, user) => {
                    if (err) reject(err);
                    resolve(user._id);
                });
            });

            seedUsers.push(user);
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

            for (let i = 0; i < maxCommentsPerRestaurant; i++) {
                const content = faker.lorem.sentences();
                const createdAt = faker.date.recent();

                const createdComment = await Comment.create({ content, createdAt });

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

module.exports = seedRandom;
