const cors = require('cors');
const express = require('express')
const { connectMongoose } = require('./connect'); // import for connecting to MongoDB
const Account = require('./models/Account'); // import for accounts model
const Event = require('./models/Event'); // import for events model

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
// ------------ Routes ------------

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Hello World!');
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
    console.log('Received Event Data:', req.body);
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

// ROUTE - CREATE ACCOUNT ROUTE
app.post('/accounts/create', async (req, res) => {
  try {
    console.log('Received Account Data:', req.body);
    
    // Create a new account with the provided identityProviderUserID
    const newAccount = await Account.createNew({
      identityProviderUserID: req.body.identityProviderUserID,
    });

    // Check if account creation was successful
    if (newAccount._id !== -1) {
      res.status(201).json(newAccount); // ACCOUNT CREATED SUCCESSFULLY
    } else {
      res.status(400).json({ message: 'Failed to create account' }); // ACCOUNT CREATION FAILED
    }
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Failed to create account' }); // INTERNAL SERVER ERROR
  }
});

// ROUTE - READ ALL EVENTS APPLIED BY AN ACCOUNT
app.get('/accounts/:accountId/events-applied', async (req, res) => {
  try {
    const { accountId } = req.params;

    // Find the account by ID and populate the eventsApplied field
    const account = await Account.findById(accountId).populate('eventsApplied').exec();

    if (account) {
      res.status(200).json(account.eventsApplied); // Return the list of events applied
    } else {
      res.status(404).json({ message: 'Account not found' }); // Account not found
    }
  } catch (error) {
    console.error('Error reading events applied:', error);
    res.status(500).json({ message: 'Failed to retrieve events applied' }); // Internal server error
  }
});

// ROUTE - ADD EVENT TO EVENTS APPLIED USING identityProviderUserID
app.post('/accounts/:identityProviderUserID/events/:eventId/apply', async (req, res) => {
  try {
    const { identityProviderUserID, eventId } = req.params;

    // Find the account by identityProviderUserID and add the event ID to eventsApplied
    const account = await Account.findOne({ identityProviderUserID });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if the event is already in eventsApplied to avoid duplicates
    if (!account.eventsApplied.includes(eventId)) {
      account.eventsApplied.push(eventId);
      await account.save();
      return res.status(200).json({ message: 'Event added to eventsApplied', account });
    } else {
      return res.status(400).json({ message: 'Event already applied to' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to apply for event' });
  }
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
