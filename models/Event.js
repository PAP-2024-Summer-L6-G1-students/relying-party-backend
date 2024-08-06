require('dotenv').config();
const collectionName = process.env.DB_EVENTS_COLLECTION;
const { Schema, model } = require('mongoose');

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

  const Event = model('Event', eventsSchema, collectionName); // creates Mongoose model named "Event"
  module.exports = Event;