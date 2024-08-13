require('dotenv').config();
const collectionName = process.env.DB_ACCOUNTS_COLLECTION;
const { Schema, model, Types } = require('mongoose');

// ------------- Accounts Schema -------------
const accountsSchema = new Schema({
    // Currently there is no "username", this can be added
    identityProviderUserID: String,
    // firstName: String,
    // lastName: String,
    // bio: String,
    // email: String,
    // phoneNum: String,
    // password: String,
    eventsApplied: [Types.ObjectId],
    eventsCreated: [Types.ObjectId],
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
  // Update an account
  static async update(accountId, accountUpdate) {
    try {
      const result = await Account.updateOne({_id: accountId}, accountUpdate);
      return result;
    }
    catch (e) {
      console.error(e);
      return {modifiedCount: 0}
    }
  }
  // Delete an account
  static async delete(accountId) {
    try {
      const result = await Account.deleteOne({_id: accountId});
      return result;
    }
    catch (e) {
      console.error(e);
      return {deletedCount: 0};
    }
  }
  // Read a specific account given its ID
  static async readProfile(accountId) {
    try {
      const result = await Account.findById(accountId).exec();
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

accountsSchema.loadClass(AccountsClass); 
const Account = model('Account', accountsSchema, collectionName); // creates Mongoose model named "Account"
module.exports = Account; // export accounts model