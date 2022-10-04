const express = require('express');

const router = express.Router();
const fs = require('fs');

const namesRaw = fs.readFileSync('./names/names.txt');
const names = namesRaw.toString().replace(/(\r\n|\n|\r|")/gm, '').split(',');

router.get('/', (req, res) => {
  res.json(names);
});

router.get('/random', (req, res) => {
  const randomInd = Math.floor(Math.random() * names.length);
  res.json(names[randomInd]);
});

const filteredNames = (input) => {
  const filteredList = names.filter((n) => n.startsWith(input));
  return filteredList;
};

router.get('/:name', (req, res) => {
  if (req.params.name !== undefined) {
    const formattedInput = `${req.params.name.charAt(0).toUpperCase()}${req.params.name.slice(1)}`;
    res.json(filteredNames(formattedInput));
  } else {
    res.json(names);
  }
});

module.exports = router;
