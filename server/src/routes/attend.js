const express = require('express');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');

const router = express.Router();

router.get('/attend/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      `SELECT g.* 
    FROM 
      final_test.attend a inner join 
      final_test.guests g on a.guests_id = g.id
    where ?;`,
      { events_id: id },
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

router.get('/attend', async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query('SELECT * from attend');
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

router.post('/attend', async (req, res) => {
  const { events_id: event, guests_id: guests } = req.body;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [resp] = await connection.query('INSERT INTO attend SET ?', {
      events_id: event,
      guests_id: guests,
    });
    await connection.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
