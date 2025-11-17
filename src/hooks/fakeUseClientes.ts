import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Cliente } from '../models/Cliente';
import type { Id } from '../models/Id';
import {
  fakeCreateCliente,
  fakeDeleteCliente,
  fakeFixedPagesClientes,
  fakeUpdateCliente
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

export function fakeUseCreateCliente(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cliente: Cliente) => fakeCreateCliente(cliente),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}

export function fakeUseUpdateCliente(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cliente: Cliente) => fakeUpdateCliente(cliente.id, cliente),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}
