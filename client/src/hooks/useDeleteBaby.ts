import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useDeleteBaby = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (babyId: string) => {
      const response = await api.delete(`/babies/${babyId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate babies list so the dashboard refreshes
      queryClient.invalidateQueries({ queryKey: ['babies'] });
    },
    onError: (error: any) => {
      console.error('[Delete Baby] Error:', error?.response?.status, error?.response?.data);
      const msg = error?.response?.data?.message || 'Failed to delete baby. Please try again.';
      alert(`Delete failed (${error?.response?.status ?? 'network error'}): ${msg}`);
    },
  });
};

