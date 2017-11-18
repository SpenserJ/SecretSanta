const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/process', (req, res) => {

  const result = processSecretSanta(req.body);
  console.log(req.body);
  res.json(result);
});

app.listen(8081, () => console.log('Listening on 8081'));

const getRandomIndex = max => Math.floor(Math.random() * max);

const processSecretSanta = people => {
  if (Object.keys(people).length < 3) {
    return {
      error: 'Not enough people for Secret Santa. There must be at least 3',
    }
  }
  /*
  const people = {
    Mom: {
      notFor: ['Dad'],
    },
    Dad: {
      notFor: ['Mom'],
    },
    Kelsey: {
      notFor: ['Chance'],
    },
    Chance: {
      notFor: ['Kelsey'],
    },
    Spenser: {
      notFor: ['Samantha'],
    },
    Samantha: {
      notFor: ['Spenser'],
    },
  };
  */

  let secretSanta;

  let cantFindPairTries = 0;
  let done = false;
  while (cantFindPairTries < 3 && done === false) {
    let remainingGive = Object.keys(people);
    let remainingReceive = Object.keys(people);
    secretSanta = {};

    while (remainingGive.length > 0) {
      const giver = remainingGive[getRandomIndex(remainingGive.length)];
      console.log(`Finding recipient for ${giver}`);
      const filteredRecipients = remainingReceive
        .filter(v => v !== giver)
        //.filter(v => people[giver].notFor.includes(v) === false);
      if (filteredRecipients.length === 0) {
        console.log('Couldn\'t find pairing');
        cantFindPairTries++;
        break;
      }
      const receiver = filteredRecipients[getRandomIndex(filteredRecipients.length)];
      remainingGive = remainingGive.filter(v => v !== giver);
      remainingReceive = remainingReceive.filter(v => v !== receiver);

      secretSanta[giver] = receiver;

      if (remainingGive.length === 0) { done = true; }
    }
  }

  if (done !== true) {
    return {
      error: 'Could not find a suitable pairing for Secret Santas',
    };
  }

  console.log(secretSanta);
  return secretSanta;
};
