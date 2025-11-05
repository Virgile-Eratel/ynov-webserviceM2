import PinoHttp from 'pino-http';
import logger from '../utils/logger.utils';

const pinoHttp = PinoHttp({
  logger,
  autoLogging: false,
  customSuccessMessage: function (res) {
    return res.statusCode === 404 ? 'Resource not found' : 'Request completed';
  },
  customErrorMessage: function (_error, res) {
    return `Request failed with status ${res.statusCode}`;
  },
});

export default pinoHttp;
