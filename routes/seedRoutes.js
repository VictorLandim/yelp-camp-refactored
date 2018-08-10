const express = require('express');
const router = express.Router();
const seedDb = require('../util/seed');
const seedDbRandom = require('../util/seedRandom');

router.get('/', async (req, res) => {
    await seedDb();

    req.flash('info', 'Database seeded. 👽');
    res.redirect('/restaurants');
});

router.get('/random', async (req, res) => {
    await seedDbRandom();

    req.flash('info', 'Database seeded randomly. 👽');
    res.redirect('/restaurants');
});

module.exports = router;
