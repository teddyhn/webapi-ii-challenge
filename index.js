const express = require('express');
const cors = require('cors');
const Router = require('./data/router');
const server = express();
server.use(express.json());
server.use(cors());
server.use('/api/posts', Router);

server.get('/', (req, res) => {
    res.send(`
      <p>Oh hi client!</p>
    `);
  });

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
