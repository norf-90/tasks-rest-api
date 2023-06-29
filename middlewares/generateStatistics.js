const { Task } = require('../models/taskSchema');
const { ctrlWrapper, countStatistics, HttpError } = require('../helpers');

const generateStatistics = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { date } = req.query; // YYYY-MM-DD
  const dateRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!date.match(dateRegExp)) throw HttpError(400, 'Date should be in format YYYY-MM-DD');
  const [year, month] = date.split('-');

  const allForMonth = await Task.find(
    { owner, date: { $regex: `${year}-${month}` } },
    '-createdAt -updatedAt'
  );
  const allForDay = await Task.find({ owner, date }, '-createdAt -updatedAt');
  const statForMonth = countStatistics(allForMonth);
  const statForDay = countStatistics(allForDay);

  req.statistics = {
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
  next();
};

module.exports = { generateStatistics: ctrlWrapper(generateStatistics) };
