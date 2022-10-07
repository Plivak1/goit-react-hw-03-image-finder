import { toast } from 'react-toastify';

export function toastError() {
  toast.error(`Произошла ошибка :( , Попробуйте еще раз`, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
