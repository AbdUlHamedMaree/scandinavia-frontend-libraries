import { ToastError } from '../../types/toast-error';

export const defaultToastError: ToastError = error => {
  let mes = 'error in request';
  if (error.response) mes = error.response.statusText;
  else if (error.request) mes = error.message;
  else mes = error.message;
  alert(mes);
};
