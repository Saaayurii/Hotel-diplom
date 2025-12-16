import { toast, TypeOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
}

export const showToast = (
  message: string,
  type: ToastType = 'info',
  options?: ToastOptions
) => {
  const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  };

  toast[type](message, defaultOptions as any);
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  showToast(message, 'success', options);
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  showToast(message, 'error', options);
};

export const showInfoToast = (message: string, options?: ToastOptions) => {
  showToast(message, 'info', options);
};

export const showWarningToast = (message: string, options?: ToastOptions) => {
  showToast(message, 'warning', options);
};
