const express = require('express');
const fs = require('fs').promises;
const getTalkers = require('../utils/getTalkers');
const validateLogin = require('../middlewares/validateLogin');
const tokenGeneator = require('../utils/getToken');
const {
  authorizeValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('../middlewares/validatePerson');
const saveTalkers = require('../utils/saveTalkers');
const getMaxTalkerId = require('../utils/getMaxTalkerId');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const ERROR_STATUS = 404;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/search', authorizeValidation, async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkers();
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
  res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();

  const talkerId = talkers.find((talker) => talker.id === Number(id));

  if (talkerId) {
    res.status(HTTP_OK_STATUS).json(talkerId); 
  } else {
  res.status(ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', validateLogin, (_req, res) => {
  const token = tokenGeneator();

  return res.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/talker', [
  authorizeValidation, 
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
], async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const maxTalkerId = getMaxTalkerId(talkers);
  const talker = { name, age, talk, id: maxTalkerId + 1 };
  talkers.push(talker);
  saveTalkers(talkers);

  return res.status(201).json(talker);
});

app.put('/talker/:id', [
  authorizeValidation, 
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  ], async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const foundTalkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  
  if (foundTalkerIndex === -1) {
      return res.status(ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkers[foundTalkerIndex] = {
    name,
    age,
    id: Number(id),
    talk,
  };
  await fs.writeFile('./src/talker.json', JSON.stringify(talkers, null, 2),
  'utf-8');
  return res.status(HTTP_OK_STATUS).json(talkers[foundTalkerIndex]);
});

app.delete('/talker/:id', authorizeValidation, async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const foundTalkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  if (foundTalkerIndex === -1) {
    return res.status(ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
}
  talkers.splice(foundTalkerIndex, 1);
  await saveTalkers(talkers);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
