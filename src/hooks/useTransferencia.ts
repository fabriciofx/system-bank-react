import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Transferencia } from '../models/Transferencia';
import { transferenciaEntreContas } from '../services/ContaService';

export function useTransferencia(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (transferencia: Transferencia) =>
      transferenciaEntreContas(transferencia),
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
