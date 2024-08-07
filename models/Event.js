require('dotenv').config();
const collectionName = process.env.DB_EVENTS_COLLECTION;
const { Schema, model } = require('mongoose');

// ------------- Events Schema -------------
const eventsSchema = new Schema({
  // Event Organizer Info
  organizerName : String,
  organizerEmail: String,
  organizerPhone: String,
  // Event Info
  eventType: String, // i.e environmental, technology, etc. 
  eventDescription: String,
  location: String,
  virtual: Boolean,
  privateOrPublic: Boolean,
  specialRequirements: String,
  maxParticipants: Number, 
  // Event Times
  startDateTime: Date, 
  endDateTime: Date,
  }); 


// ------------- Events Class -------------
class EventsClass {
  // Create new event 
  static async createNew(event) {
    try {
      const newEvent = await Event.create(event);
      return newEvent;
    }
    catch (e) {
      console.error(e);
      return {_id: -1}
    }
  }
  // Update an event
  static async update(eventId, eventUpdate) {
    try {
      const result = await Event.updateOne({_id: eventId}, eventUpdate);
      return result;
    }
    catch (e) {
      console.error(e);
      return {modifiedCount: 0}
    }
  }
  // Delete an event
  static async delete(eventId) {
    try {
      const result = await Event.deleteOne({_id: eventId});
      return result;
    }
    catch (e) {
      console.error(e);
      return {deletedCount: 0};
    }
  }
  // ----- READ FUNCTIONS BELOW -----
  // Read all events
  static async readAllEvents() {
    try {
      const results = await Event.find({}).sort({ date: -1 }).exec(); // sends back all existing events
      return results;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  // Read a specific event given its ID
  static async readSpecificEvent(eventId) {
    try {
      const result = await Event.findById(eventId).exec();
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

eventsSchema.loadClass(EventsClass);
const Event = model('Event', eventsSchema, collectionName); // creates Mongoose model named "Event"
module.exports = Event;