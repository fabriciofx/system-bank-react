import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Saque } from '../models/Saque';
import { saqueConta } from '../services/ContaService';

export function useSaque(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (saque: Saque) => saqueConta(saque),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pagesContasClientes']
      });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}
