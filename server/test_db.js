const mongoose = require('mongoose');

async function test() {
  await mongoose.connect('mongodb+srv://uditsingh8642_db_user:JmahwZfzEUA9OFyS@cluster0.cs8zkk2.mongodb.net/MEDBLUE?appName=Cluster0');
  
  const db = mongoose.connection.db;
  const babies = await db.collection('babies').find({}, { projection: { displayId: 1, motherName: 1, weight: 1, gestationalAge: 1, gender: 1 } }).sort({ _id: -1 }).limit(10).toArray();
  
  console.log("Recent babies in DB:");
  console.log(babies);
  
  process.exit(0);
}

test();
