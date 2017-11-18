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

let secretSanta;

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

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
      .filter(v => people[giver].notFor.includes(v) === false);
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

console.log(secretSanta);
