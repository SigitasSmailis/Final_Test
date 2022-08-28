const express = require('express');
// const Joi = require('joi');
const mysql = require('mysql2/promise');
// const bcrypt = require('bcrypt');
const DB_CONFIG = require('../../config');

const router = express.Router();

// router.get('/guests', async (req, res) => {
//   res.json('labukas serveri');
// });
//   --  validacija kai darai update
// const updateSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ['com', 'net'] },
//   }),
//   password: Joi.string(),
// });

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

  console.log('parameters:', name, surname, email, birthday);
  // try {
  //   await billsSchema.validateAsync({ groupId, amount, description });
  // } catch (err) {
  //   return res.status(400).json(err);
  // }
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

//  -- delete
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

// -- update
router.patch('/guests/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, birthday } = req.body;
  try {
    // try {
    //   await updateSchema.validateAsync({ name, email, password });
    // } catch (err) {
    //   return res.status(400).json({
    //     status: 400,
    //     err,
    //   });
    // }
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

// router.post('/guests', async (req, res) => {
//   const { name, email, birthday } = req.body;
// try {
//   await postSchema.validateAsync({
//     title,
//     desc,
//     url,
//     owner: req.user._id,
//   });
// } catch (err) {
//   return res.json({ status: false, error: err });
// }

//   const post = new PostSchema({
//     title,
//     desc,
//     url,
//     owner: req.user._id,
//   });
//   try {
//     const savePost = await post.save();
//     res.status(201).json(savePost);
//   } catch (err) {
//     res.json(err);
//   }
// });

router.get('/guests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [[rows]] = await con.query(
      `SELECT id, name, surname, email from guests WHERE id=${Number(id)}`,
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

// const express = require('express');
// const Joi = require('joi');
// const mysql = require('mysql2/promise');
// const bcrypt = require('bcrypt');
// const DB_CONFIG = require('../../config');

// const router = express.Router();

// const updateSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ['com', 'net'] },
//   }),
//   password: Joi.string(),
// });

// router.get('/users', async (req, res) => {
//   try {
//     const con = await mysql.createConnection(DB_CONFIG);
//     const [rows] = await con.query(
//       'SELECT id, name, email from papildomos_users',
//     );
//     await con.end();
//     return res.json(rows);
//   } catch (err) {
//     return res.status(500).json({
//       status: 500,
//       err,
//     });
//   }
// });

// router.get('/user/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const con = await mysql.createConnection(DB_CONFIG);
//     const [[rows]] = await con.query(
//       `SELECT id, name, email from papildomos_users WHERE id=${Number(id)}`,
//     );
//     await con.end();
//     return res.json(rows || {});
//   } catch (err) {
//     return res.status(500).json({
//       status: 500,
//       err,
//     });
//   }
// });

// router.delete('/user/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const con = await mysql.createConnection(DB_CONFIG);
//     const [resp] = await con.query(
//       `DELETE FROM papildomos_users WHERE id="${Number(id)}"`,
//     );
//     await con.end();
//     return res.json(resp);
//   } catch (err) {
//     return res.status(500).json({
//       status: 500,
//       err,
//     });
//   }
// });

// router.patch('/user/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;
//   try {
//     try {
//       await updateSchema.validateAsync({ name, email, password });
//     } catch (err) {
//       return res.status(400).json({
//         status: 400,
//         err,
//       });
//     }

//     const userData = {};
//     if (name) userData.name = name;
//     if (password) userData.password = await bcrypt.hash(password, 10);
//     if (email) userData.email = email;
//     const con = await mysql.createConnection(DB_CONFIG);
//     const [resp] = await con.query(
//       `UPDATE papildomos_users SET ? WHERE id="${Number(id)}"`,
//       userData,
//     );
//     await con.end();
//     return res.json(resp);
//   } catch (err) {
//     return res.status(500).json({
//       status: 500,
//       err,
//     // });
//   }
// });

// module.exports = router;
