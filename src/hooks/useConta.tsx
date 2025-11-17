import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Conta } from '../models/Conta';
import type { Id } from '../models/Id';
import {
  createConta,
  deleteConta,
  updateConta
} from '../services/ContaService';

export function useCreateConta(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (conta: Conta) => await createConta(conta),
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

export function useUpdateConta(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (conta: Conta) => await updateConta(conta.id, conta),
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

export function useDeleteConta(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => await deleteConta(id.id),
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
