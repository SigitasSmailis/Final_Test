const express = require('express');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');

const router = express.Router();

router.get('/guests', async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      'SELECT id, name, surname, email, birthday from guests',
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

router.post('/guests', async (req, res) => {
  const { name, surname, email, birthday } = req.body;

  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [resp] = await connection.query('INSERT INTO guests SET ?', {
      name,
      surname,
      email,
      birthday,
    });
    await connection.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/guests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const sql = `DELETE FROM attend WHERE guests_id=${id}; DELETE FROM guests WHERE id=${id}`;
    const [resp] = await con.query(sql);

    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

router.patch('/guests/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, birthday } = req.body;
  try {
    const userData = {};
    if (name) userData.name = name;
    if (surname) userData.surname = surname;
    if (email) userData.email = email;
    if (birthday) userData.birthday = birthday;
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `UPDATE guests SET ? WHERE id="${Number(id)}"`,
      userData,
    );
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

router.get('/guests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [[rows]] = await con.query(
      `SELECT id, name, surname, email, birthday from guests WHERE id=${Number(
        id,
      )}`,
    );
    await con.end();
    return res.json(rows || {});
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

module.exports = router;
