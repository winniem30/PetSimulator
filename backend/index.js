const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-battle')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Pet Schema
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

// API Routes
app.get('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findOne({ id: req.params.id });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/pets', async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Socket.io for real-time battles
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-battle', (petId) => {
    socket.join('battle-room');
    socket.emit('battle-joined', { message: 'Joined battle room' });
  });

  socket.on('attack', (data) => {
    // Simulate battle logic
    io.to('battle-room').emit('battle-update', { attacker: socket.id, damage: data.damage });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));