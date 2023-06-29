const { validateBody } = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');
const { generateStatistics } = require('./generateStatistics');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  generateStatistics,
};
