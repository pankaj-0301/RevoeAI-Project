const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['text', 'date'],
    default: 'text'
  }
});

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  columns: [columnSchema],
  sheetData: [{
    type: Map,
    of: String
  }],
  customColumns: [columnSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Table', tableSchema);