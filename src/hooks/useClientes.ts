'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Cliente } from '../models/Cliente';
import type { Id } from '../models/Id';
import {
  createCliente,
  deleteCliente,
  pagesClientes,
  updateCliente
} from '../services/ClienteService';

export function usePagesClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesClientes', num, size],
    queryFn: async () => await pagesClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}

export function useDeleteCliente(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => await deleteCliente(id.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}

export function useCreateCliente(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cliente: Cliente) => await createCliente(cliente),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}

export function useUpdateCliente(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cliente: Cliente) =>
      await updateCliente(cliente.id, cliente),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pagesClientes'] });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}
