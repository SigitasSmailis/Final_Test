const express = require('express');

const app = express();
require('dotenv').config();
const cors = require('cors');
const eventsRouter = require('./src/routes/events');
const guestsRouter = require('./src/routes/guests');
const attendRouter = require('./src/routes/attend');

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use('/api/', eventsRouter);
app.use('/api/', guestsRouter);
app.use('/api/', attendRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
