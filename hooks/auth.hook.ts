import { loginUser } from '@/service/authService/authService';
import { useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useUserLoginMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_REGISTER'],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success('Login successful', { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
