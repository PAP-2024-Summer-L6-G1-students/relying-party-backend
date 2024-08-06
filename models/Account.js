require('dotenv').config();
const collectionName = process.env.DB_ACCOUNTS_COLLECTION;
const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
    // Currently there is no "username", this can be added
    firstName: String,
    lastName: String,
    // Users will log-in using their email/phone number
    email: String,
    phoneNum: String,
    password: String,
    // Below stores events user has applied to or has created
    eventsApplied: [ObjectId],
    eventsCreated: [ObjectId],
  });

  const Account = model('Account', accountSchema, collectionName); // creates Mongoose model named "Event"
  module.exports = Account;