const mongoose = require('mongoose');

const WatchListSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  symbols: [String]
});

module.exports = mongoose.model('WatchList', WatchListSchema);
