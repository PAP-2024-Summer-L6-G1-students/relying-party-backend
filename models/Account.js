require('dotenv').config();
const collectionName = process.env.DB_ACCOUNTS_COLLECTION;
const { Schema, model } = require('mongoose');

// ------------- Accounts Schema -------------
const accountsSchema = new Schema({
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

  // ------------- Accounts Class -------------
  class AccountsClass {
    // Create new account
    static async createNew(account) {
      try {
        const newAccount = await Account.create(account);
        return newAccount;
      }
      catch (e) {
        console.error(e);
        return {_id: -1}
      }
    }
  }

accountsSchema.loadClass(AccountsClass); 
const Account = model('Account', accountsSchema, collectionName); // creates Mongoose model named "Account"
module.exports = Account; // export accounts model