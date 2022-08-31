const express = require('express');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');

const router = express.Router();

router.get('/events', async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query('SELECT id, name, date from events');
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

router.post('/events', async (req, res) => {
  const { name, date } = req.body;

  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [resp] = await connection.query('INSERT INTO events SET ?', {
      name,
      date,
    });
    await connection.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      'SELECT id, name, date from events where ?',
      { id },
    );
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

module.exports = router;
