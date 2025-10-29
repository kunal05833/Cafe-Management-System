import { toast } from 'sonner';

export const useToast = () => {
  const showToast = {
    success: (message, options = {}) => {
      toast.success(message, {
        duration: 4000,
        ...options
      });
    },
    
    error: (message, options = {}) => {
      toast.error(message, {
        duration: 5000,
        ...options
      });
    },
    
    info: (message, options = {}) => {
      toast.info(message, {
        duration: 4000,
        ...options
      });
    },
    
    warning: (message, options = {}) => {
      toast.warning(message, {
        duration: 4000,
        ...options
      });
    },
    
    loading: (message, options = {}) => {
      return toast.loading(message, options);
    },
    
    promise: (promise, messages) => {
      return toast.promise(promise, {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error occurred'
      });
    },
    
    custom: (component, options = {}) => {
      toast.custom(component, options);
    },
    
    dismiss: (toastId) => {
      toast.dismiss(toastId);
    }
  };

  return showToast;
};