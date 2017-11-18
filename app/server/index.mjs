import express from 'express';
import bodyParser from 'body-parser';

import processSecretSanta from './process';

const app = express();
app.use(bodyParser.json());

app.post('/process', (req, res) => {
  const result = processSecretSanta(req.body);
  console.log(req.body);
  res.json(result);
});

app.listen(8081, () => console.log('Listening on 8081'));
