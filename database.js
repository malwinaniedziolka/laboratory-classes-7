const mongodb = require('mongodb');
const { DB_USER, DB_PASS } = require('./config');

const MongoClient = mongodb.MongoClient;

let database; 

const mongoConnect = (callback) => {
    MongoClient.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@shopcluster.plqmprb.mongodb.net/shop?retryWrites=true&w=majority&appName=ShopCluster`
    )
    .then((result) => {
        console.log('Connection to the database has been established.');
        database = result.db('shop');
        callback(result);
    })
    .catch((error) => console.log(error));
};

const getDatabase = () => {
  if (database) {
    return database;
  }
  throw 'No database found.';
};

module.exports = { mongoConnect, getDatabase };
