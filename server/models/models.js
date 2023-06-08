const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://bryanltrang:73VwgUD6oMwAOjzu@cluster0.nopdg7h.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'solo_project',
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => {
    console.log(err);
  });

const Schema = mongoose.Schema;

const rotationsSchema = new Schema({
  miles: Number,
  vehicle_id: String,
  created_at: String,
});

const Rotations = mongoose.model('rotations', rotationsSchema);

module.exports = { Rotations };
