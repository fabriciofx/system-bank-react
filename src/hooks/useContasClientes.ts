import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '../models/Id';
import { pagesContasClientes } from '../services/ContaClienteService';
import { deleteConta } from '../services/ContaService';

export function usePagesContasClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesContasClientes', num, size],
    queryFn: () => pagesContasClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}

export function useDeleteConta(options: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => deleteConta(id.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pagesContasClientes']
      });
      options.onSuccess();
    },
    onError: () => {
      options.onError();
    }
  });
}
