const ctrlWrapper = require('../../helpers/ctrlWrapper');

const statistics = async (req, res) => {
  console.log('in statistics:');
  console.log(req.statistics);
  res.json(req.statistics);
};

module.exports = { statistics: ctrlWrapper(statistics) };
