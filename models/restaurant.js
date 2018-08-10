const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 59.95
    },
    description: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        name: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: 'London, England'
    },
    lat: {
        type: Number,
        default: 51.5074
    },
    lng: {
        type: Number,
        default: 0.1278
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
