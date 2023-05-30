const fs = require('fs').promises;
const path = require('path');

const pathTalker = '../src/talker.json';

const getTalkers = async () => {
    const talkersData = await fs.readFile(path.resolve(__dirname, pathTalker));
    const talkers = JSON.parse(talkersData);
    return talkers;
};

module.exports = getTalkers;