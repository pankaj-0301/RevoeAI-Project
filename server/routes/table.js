const express = require('express');
const auth = require('../middleware/auth');
const Table = require('../models/Table');
const { getSheetData } = require('../utils/googleSheets');
const router = express.Router();

// Create new table
router.post('/', auth, async (req, res) => {
  try {
    const { name, columns } = req.body;
    const table = new Table({
      name,
      columns,
      userId: req.userId
    });
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error creating table' });
  }
});

// Get all tables for user
router.get('/', auth, async (req, res) => {
  try {
    const tables = await Table.find({ userId: req.userId });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables' });
  }
});

// Get sheet data
router.get('/:tableId/data', auth, async (req, res) => {
  try {
    const table = await Table.findOne({ _id: req.params.tableId, userId: req.userId });
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    const sheetData = await getSheetData();
    // Map sheet data to table columns
    const mappedData = sheetData.map(row => {
      const mappedRow = {};
      table.columns.forEach(column => {
        mappedRow[column.name] = row[column.name];
      });
      return mappedRow;
    });
    
    res.json(mappedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sheet data' });
  }
});

// Add custom column
router.post('/:tableId/columns', auth, async (req, res) => {
  try {
    const { name, type } = req.body;
    const table = await Table.findOne({ _id: req.params.tableId, userId: req.userId });
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    table.customColumns.push({ name, type });
    await table.save();
    
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error adding column' });
  }
});

module.exports = router;