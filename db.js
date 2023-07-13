const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

async function run() {
  try {
    await mongoose.connect(DB_URI);

    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed");

    process.exit(1);
  }
}

run().catch(console.error);
// module.exports = run;
// const { MongoClient } = require("mongodb");
// const paswords = "Ems-je123";

// const uri = `mongodb+srv://Dmutro:${paswords}@cluster0.dpubs9y.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient({ uri });

// async function run() {
//   try {
//     await client.connect();

//     await client.db("contacts").command({ping: 1});

//     console.info('connected')

//   } catch (err) {
//     console.log(err);

//     process.exit(1);

//   } finally{
//     await client.close();
//   }
// }

// run().catch(console.dir);
