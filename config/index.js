module.exports = {
    mongoUrl:
        process.env.DB_PW && process.env.DB_USER
            ? `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds255451.mlab.com:55451/restaurants-db5`
            : `mongodb://localhost:27017/restaurants-db5`
};
