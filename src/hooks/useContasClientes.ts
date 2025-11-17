import { useQuery } from '@tanstack/react-query';
import { pagesContasClientes } from '../services/ContaClienteService';

export function usePagesContasClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesContasClientes', num, size],
    queryFn: async () => await pagesContasClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}
