const express = require('express');

const app = express();
const images = require('./images.js');

const SLEEP_TIME = 1000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.listen(8080, () => {});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/bip39', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(200).json(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food', 'Tony', 'Lisa', 'Michael', 'Ginger', 'Food', 'Tony', 'Lisa', 'Michael', 'Ginger', 'Food', 'Tony', 'Lisa', 'Michael', 'Ginger', 'Food', 'Tony', 'Lisa', 'Michael', 'Ginger']);
});

app.post('/bip39/validate-phrase', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(200).json(true);
});

app.post('/vault', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(201).json('');
});

// DIDs
app.get('/vault/dids', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(200).json([
    {
      id: 'IezbeWGSY2dqcUBqT8K7R14xr',
      alias: 'Trinity',
      avatar: images.TRINITY,
      state: 'TODO',
    },
    {
      id: 'Iez25N5WZ1Q6TQpgpyYgiu9gTX',
      alias: 'Neo',
      avatar: images.NEO,
      state: 'TODO',
    },
  ]);
});

app.post('/vault/dids', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(201).json({
    id: 'IezbeWGSY2dqcUBqT8K7R14xr',
    alias: 'disco-deer',
    avatar: images.DEFAULT,
    state: 'TODO',
  });
});

app.put('/vault/dids/:did/alias', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(200).json('');
});

// claim schemas

// claims
app.get('/claims', async (req, res) => {
  await sleep(SLEEP_TIME);
  res.status(200).json([{
    did: {
      id: 'IezbeWGSY2dqcUBqT8K7R14xr',
      alias: 'Trinity',
    },
    id: 'McL9746fWtE9EXV5',
    alias: 'AgeOf',
    properties: {
      age: 12,
    },
    witnesses: [
      { did: { id: 'eWGSY2dqcUBqT8K7', alias: 'someone 1' }, signed: true },
      { did: { id: '746fWtE9EXV5q23d', alias: 'someone 2' }, signed: true },
    ],
  },
  {
    did: {
      id: 'IezbeWGSY2dqcUBqT8K7R143r',
      alias: 'Neo',
    },
    id: 'McL9746fWtE9EXV2',
    alias: 'EyeColor',
    properties: {
      color: 'red',
    },
    witnesses: [
      { did: { id: 'eWGSY2dqcUBqT8K7', alias: 'someone 1' }, signed: false },
      { did: { id: '746fWtE9EXV5q23d', alias: 'someone 2' }, signed: true },
    ],
  },
  ]);
});
