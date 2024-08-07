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
}

eventsSchema.loadClass(EventsClass);
const Event = model('Event', eventsSchema, collectionName); // creates Mongoose model named "Event"
module.exports = Event;