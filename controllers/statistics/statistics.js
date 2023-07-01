const ctrlWrapper = require('../../helpers/ctrlWrapper');

const statistics = async (req, res) => {
  res.json(req.statistics);
};

module.exports = { statistics: ctrlWrapper(statistics) };
