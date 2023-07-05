const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { Task } = require('../../models/taskSchema');
const { countStatistics } = require('../../helpers');

const statistics = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query; // YYYY-MM-DD
  const [year, month] = date.split('-');

  const allForMonth = await Task.find(
    { owner, date: { $regex: `${year}-${month}` } },
    '-createdAt -updatedAt'
  );
  const allForDay = await Task.find({ owner, date }, '-createdAt -updatedAt');
  const statForMonth = countStatistics(allForMonth);
  const statForDay = countStatistics(allForDay);

  const resultObject = {
    todo: {
      forDay: {
        percents: Math.round(statForDay.todoPercents),
        quantity: statForDay.todoQuantity,
      },
      forMonth: {
        percents: Math.round(statForMonth.todoPercents),
        quantity: statForMonth.todoQuantity,
      },
    },
    inProgres: {
      forDay: {
        percents: Math.round(statForDay.inProgresPercents),
        quantity: statForDay.inProgresQuantity,
      },
      forMonth: {
        percents: Math.round(statForMonth.inProgresPercents),
        quantity: statForMonth.inProgresQuantity,
      },
    },
    done: {
      forDay: {
        percents: Math.round(statForDay.donePercents),
        quantity: statForDay.doneQuantity,
      },
      forMonth: {
        percents: Math.round(statForMonth.donePercents),
        quantity: statForMonth.doneQuantity,
      },
    },
    totalForDay: allForDay.length,
    totalForMonth: allForMonth.length,
  };

  res.json(resultObject);
};

module.exports = { statistics: ctrlWrapper(statistics) };
