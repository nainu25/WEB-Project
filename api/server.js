const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
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

    app.get('/api/homes', async (req, res) => {
      const homeList = await homes.find({}).toArray();
      res.json(homeList);
    });

    app.post('/api/homes', async (req, res) => {
      const newHome = req.body;
      const result = await homes.insertOne(newHome);
      res.json(result);
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
