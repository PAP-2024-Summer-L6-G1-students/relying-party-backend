const express = require('express')
const { connectMongoose } = require('./connect'); // import for connecting to MongoDB
const Account = require('./models/Account'); // import for accounts model
const Event = require('./models/Event'); // import for events model

const app = express()
const port = process.env.PORT || 3002

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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
