import api from './api';
import type { PageResult } from '../core/PageResult';
import type { Conta } from '../models/Conta';

// Função para buscar todas as contas
export async function listContas(): Promise<Conta[]> {
  try {
    const response = await api.get<Conta[]>('/contas/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contas:', error);
    throw error;
  }
}

// Função para buscar contas paginado
export async function pagesContas(
  num: number,
  size: number
): Promise<PageResult<Conta>> {
  const all = await listContas();
  const max = Math.ceil(all.length / size);
  if (num > max) {
    throw new Error(`Página maior que o limite permitido (${max})`);
  }
  const url = `/contas/?page=${num}&pageSize=${size}`;
  const contas = await api.get<Conta[]>(url);
  const result: PageResult<Conta> = {
    items: contas.data,
    page: num,
    pageSize: size,
    total: all.length
  };
  return result;
}

// Função para criar uma conta
export async function createConta(conta: Conta): Promise<Conta> {
  try {
    const response = await api.post<Conta>('/contas/', conta);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar uma conta:', error);
    throw error;
  }
}

// Função para atualizar uma conta
export async function updateConta(
  id: number,
  contaAtualizada: Conta
): Promise<Conta> {
  try {
    const response = await api.put<Conta>(`/contas/${id}/`, contaAtualizada);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar a conta:', error);
    throw error;
  }
}

// Função para deletar uma conta
export async function deleteConta(id: number) {
  try {
    await api.delete<Conta>(`/contas/${id}`);
  } catch (error) {
    console.error('Erro ao deletar a conta:', error);
    throw error;
  }
}
