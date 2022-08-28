const express = require('express');
// const Joi = require('joi');
const mysql = require('mysql2/promise');
// const bcrypt = require('bcrypt');
const DB_CONFIG = require('../../config');

const router = express.Router();

// router.get('/attend', (req, res) => {
//   res.send('Hello world');
// });
const selectGuestsByEvent = `SELECT g.* 
FROM 
  final_test.attend a inner join 
  final_test.guests g on a.guests_id = g.id
where ?;`;

router.get('/attend/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(selectGuestsByEvent, { events_id: id });
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
  // try {
  //   await billsSchema.validateAsync({ groupId, amount, description });
  // } catch (err) {
  //   return res.status(400).json(err);
  // }
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

// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     try {
//       await registerSchema.validateAsync({ name, email, password });
//     } catch (err) {
//       return res.status(400).json({
//         status: 400,
//         err,
//       });
//     }
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const con = await mysql.createConnection(DB_CONFIG);
//     const [rows] = await con.query(
//       `SELECT email from papildomos_users WHERE email="${email}"`,
//     );
//     if (rows.length > 0) {
//       return res.status(400).json({ status: 400, err: 'Bad email!' });
//     }
//     const [resp] = await con.query('INSERT INTO papildomos_users SET ?', {
//       name,
//       email,
//       password,
//       // hashedPassword,
//     });
//     await con.end();
//     return res.json(resp);
//   } catch (err) {
//     return res.status(500).json({
//       status: 500,
//       err,
//     });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     try {
//       await loginSchema.validateAsync({ email, password });
//     } catch (err) {
//       return res.status(400).json({
//         status: 400,
//         err,
//       });
//     }
//     const con = await mysql.createConnection(DB_CONFIG);
//     const [[user]] = await con.query(
//       `SELECT * from papildomos_users WHERE email="${email}"`,
//     );
//     if (!user) {
//       return res.status(400).json({ status: 400, err: 'User not Found!' });
//     }
//     const compare = await bcrypt.compare(password, user.password);
//     if (!compare) {
//       return res
//         .status(400)
//         .json({ status: 400, err: 'User password is incorrect!' });
//     }
//     await con.end();
//     return res.json({
//       status: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: 500,
//       err,
//     });
//   }
// });

module.exports = router;
