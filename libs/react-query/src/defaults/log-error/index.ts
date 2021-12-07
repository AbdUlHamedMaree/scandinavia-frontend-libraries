import { LogError } from '../../types/log-error';
import { logError } from '../../utils';

export const defaultLogError: LogError = error => {
  let logs = { title: '', body: {} };
  if (error.response) logs = { title: 'received response', body: error.response };
  else if (error.request)
    logs = {
      title: 'WITH NO RESPONSE, the request',
      body: error.request,
    };
  else
    logs = {
      title: 'unhandled error happened, the message form axios request',
      body: error.message,
    };
  logError(logs.title + '\n', JSON.stringify(logs.body, null, 2));
};
