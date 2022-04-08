const mongoose = require('mongoose');
const Schema = mongoose.Schema; // allows you to write Schema.Types.ObjectId in properties and leave off mongoose in beginning

const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, default: 5},
  user: {type: Schema.Types.ObjectId, ref: 'User'}, //prob don't need to populate the user every time, we can just store their username bc that's the
  userName: String, //most common thing we'll display with the review
  userAvatar: String
}, {
  timestamps: true
});

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  },
  mpaaRating: String,
  nowShowing: { type: Boolean, default: false },
  reviews: [reviewSchema],//One movie has many reviews
  cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}] // Many to Many Relationship, referencing
  // ref, referencing the name of the Performer model, 
  //look at the export statement in models/performer
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema); //compiles your schema into a model bc models, not schemas are used to perform CRUD on a MongoDB collection