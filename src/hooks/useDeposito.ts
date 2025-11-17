import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Deposito } from '../models/Deposito';
import { depositoConta } from '../services/ContaService';

export function useDeposito(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deposito: Deposito) => depositoConta(deposito),
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
