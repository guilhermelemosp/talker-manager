const fs = require('fs').promises;
const path = require('path');

const pathTalker = '../src/talker.json';

const saveTalkers = async (talkers) => {
    const talkersData = JSON.stringify(talkers, null, 2);
    await fs.writeFile(path.resolve(__dirname, pathTalker), talkersData);
};

module.exports = saveTalkers;