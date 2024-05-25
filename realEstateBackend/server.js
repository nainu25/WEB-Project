const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = "mongodb+srv://Nianu25:nainu25@wddproject.url8zlb.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Real Estate API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('realEstate');
    const homes = database.collection('homes');

    // Endpoint to get all homes
    app.get('/homes', async (req, res) => {
      const homeList = await homes.find({}).toArray();
      res.json(homeList);
    });

    // Endpoint to add a new home
    app.post('/homes', async (req, res) => {
      const newHome = req.body;
      const result = await homes.insertOne(newHome);
      res.json(result);
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
