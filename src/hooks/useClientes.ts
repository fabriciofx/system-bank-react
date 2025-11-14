import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '../models/Id';
import { deleteCliente, pagesClientes } from '../services/ClienteService';

export function usePagesClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesClientes', num, size],
    queryFn: () => pagesClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}

export function useDeleteCliente(options: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => deleteCliente(id.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: () => {
      options.onError();
    }
  });
}
