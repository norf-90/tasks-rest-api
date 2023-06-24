const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      console.log('in try ctrl wrapper');
      await ctrl(req, res, next);
    } catch (error) {
      console.log('catch ctrl wrapper');
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
