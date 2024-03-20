
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://lmsand99:PHPJ31wkiOqXSglF@cluster1.n2evzlo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function setupDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('sample_mflix')

    return {
      client,
      db: db,
      users: db.collection('users'),
      movies: db.collection('movies')

    }
  } catch(err) {
    console.log("Error connecting to the database")
    return {}
  }
}
