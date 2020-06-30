const { NODE_ENV, JWT_SECRET, PORT } = process.env;
module.exports.PORT = PORT || 3000;
module.exports.DATABASE_URL = 'mongodb://localhost:27017/newsexplorerdb';
module.exports.JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
