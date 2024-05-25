const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://Nianu25:nainu25@wddproject.url8zlb.mongodb.net/";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('realEstate');
    const homes = database.collection('homes');

    // Insert a new home
    const newHome = {
      address: "101 Maple St, Springfield",
      rooms: 3,
      kitchen: 1,
      bathrooms: 2,
      price: 275000,
      forRent: false
    };
    const result = await homes.insertOne(newHome);
    console.log(`New home inserted with id: ${result.insertedId}`);

    // Retrieve all homes
    const homeList = await homes.find({}).toArray();
    console.log('Homes in the database:');
    console.log(homeList);

  } finally {
    await client.close();
  }
}

main().catch(console.error);
