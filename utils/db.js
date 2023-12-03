// import { MongoClient } from 'mongodb';
const MongoClient = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * Class for performing operations with Mongodb
 */
class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(DB_DATABASE);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  /**
   * Checks if connection to Mongo is Alive
   * @return {boolean} true if connection or false if no connection
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * Returns the number of documents in the collection users
   * @return {number} amount of users
   */
  async nbUsers() {
    const numberOfUsers = this.usersCollection.countDocuments();
    return numberOfUsers;
  }

  /**
   * Returns the number of documents in the collection files
   * @return {number} amount of files
   */
  async nbFiles() {
    const numberOfFiles = this.filesCollection.countDocuments();
    return numberOfFiles;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
