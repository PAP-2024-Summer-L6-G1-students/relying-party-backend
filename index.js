const express = require('express')
const { connectMongoose } = require('./connect'); // import for connecting to MongoDB
const Account = require('./models/Account'); // import for accounts model
const Event = require('./models/Event'); // import for events model

const app = express()
const port = process.env.PORT || 3002

// ------------ Routes ------------

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// TEST ROUTE
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// ROUTE 1 - GET ALL EVENTS
app.get('/events', async (req, res) => {
  try {
    const events = await Event.readAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
  }
});

// ROUTE 2 - CREATE EVENTS 
app.post('/events', async (req, res) => {
  try {
    const eventData = req.body; // Get event data from the request body
    const newEvent = await Event.createNew(eventData); // Create the new event
    if (newEvent._id !== -1) {
      res.status(201).json(newEvent); // EVENT CREATED SUCCESSFUL
    } else {
      res.status(400).json({ message: 'Failed to create event' }); // EVENT COULD NOT BE CREATED
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// EXAMPLE ROUTE - EXAMPLE EVENTS 
app.get('/events/test', (req, res) => {
  // Example events for testing
  const exampleEvents = [
    {
      _id: "example1",
      organizerName: "John Doe",
      organizerEmail: "john@example.com",
      organizerPhone: "555-5555",
      eventType: "Technology",
      eventDescription: "A tech conference",
      location: "New York",
      virtual: false,
      specialRequirements: "None",
      maxParticipants: 100,
      eventParticipants: [],
      eventCreatedBy: "exampleUserId1",
      startDateTime: "2024-08-20T14:00:00Z",
      endDateTime: "2024-08-20T18:00:00Z"
    },
    {
      _id: "example2",
      organizerName: "Jane Smith",
      organizerEmail: "jane@example.com",
      organizerPhone: "555-1234",
      eventType: "Environmental",
      eventDescription: "A sustainability workshop",
      location: "Online",
      virtual: true,
      specialRequirements: "None",
      maxParticipants: 50,
      eventParticipants: [],
      eventCreatedBy: "exampleUserId2",
      startDateTime: "2024-09-15T10:00:00Z",
      endDateTime: "2024-09-15T12:00:00Z"
    }
  ];

  // Return the example events as a JSON response
  res.status(200).json(exampleEvents);
});

//* ********************* Launching the server **************** */
const start = async () => {
  try {
      await connectMongoose();
      app.listen(port, () => console.log(`Server running on port ${port}...`));
  }
  catch (err) {
      console.error(err);
  }
}

start();
