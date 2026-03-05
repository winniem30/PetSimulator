const mongoose = require('mongoose');

// Pet Schema (same as in server)
const petSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  health: { type: Number, default: 100 },
  abilities: [{ name: String, power: Number }],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 }
});

const Pet = mongoose.model('Pet', petSchema);

// User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

const User = mongoose.model('User', userSchema);

// Connect to DB
mongoose.connect('mongodb://localhost:27017/pet-battle')
  .then(async () => {
  console.log('Seeding data...');

  // Sample users
  const user1 = new User({ id: 'user1', username: 'Player1' });
  const user2 = new User({ id: 'user2', username: 'Player2' });
  await user1.save();
  await user2.save();

  // Sample pets
  const pet1 = new Pet({
    id: 'pet1',
    ownerId: 'user1',
    name: 'Fire Dragon',
    abilities: [{ name: 'Fire Breath', power: 50 }, { name: 'Tail Whip', power: 30 }]
  });
  const pet2 = new Pet({
    id: 'pet2',
    ownerId: 'user2',
    name: 'Ice Wolf',
    abilities: [{ name: 'Ice Fang', power: 45 }, { name: 'Howl', power: 25 }]
  });
  await pet1.save();
  await pet2.save();

  console.log('Data seeded successfully');
  process.exit();
}).catch(err => console.log(err));