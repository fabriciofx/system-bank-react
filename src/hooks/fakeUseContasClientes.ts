import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '../models/Id';
import { fakeFixedPagesContasClientes } from '../services/FakeContaClienteService';
import { fakeDeleteConta } from '../services/FakeContaService';

export function fakeUsePagesContasClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesContasClientes', num, size],
    queryFn: () => fakeFixedPagesContasClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}

export function fakeUseDeleteConta(options: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => fakeDeleteConta(id.id),
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
