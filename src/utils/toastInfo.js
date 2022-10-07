import { toast } from 'react-toastify';

export function toastInfo(string) {
  toast.info(string, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
