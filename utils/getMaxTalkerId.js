const getMaxTalkerId = (talkers) => {
    let maxId = 1;
    for (let index = 0; index < talkers.length; index += 1) {
        const talkerId = talkers[index].id;
        if (talkerId > maxId) {
            maxId = talkerId;
        }
    }
    return maxId;
};

module.exports = getMaxTalkerId;