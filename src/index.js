const express = require('express');
const app = express();
const { port } = require('./config/env');
const errorHandler = require('./utils/errorHandler');

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/mappings', require('./routes/mappings'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
