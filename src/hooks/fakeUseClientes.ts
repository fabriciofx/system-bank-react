import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '../models/Id';
import {
  fakeDeleteCliente,
  fakeFixedPagesClientes
} from '../services/FakeClienteService';

export function fakeUsePagesClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesClientes', num, size],
    queryFn: () => fakeFixedPagesClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}

export function fakeUseDeleteCliente(options: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => fakeDeleteCliente(id.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: () => {
      options.onError();
    }
  });
}
