import type { PageResult } from '../core/PageResult';
import type { Conta } from '../models/Conta';
import type { Deposito } from '../models/Deposito';
import type { Saque } from '../models/Saque';
import type { Transferencia } from '../models/Transferencia';
import api from './api';

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
  if (num < 1 || num > max) {
    throw new Error(`Página fora do limite permitido (min: 1, max: ${max})`);
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
export async function deleteConta(id: number): Promise<void> {
  try {
    await api.delete<Conta>(`/contas/${id}`);
  } catch (error) {
    console.error('Erro ao deletar a conta:', error);
    throw error;
  }
}

// Função para sacar um valor de uma conta
export async function saqueConta(saque: Saque): Promise<void> {
  try {
    console.log('saque: ', saque);
    await api.post<Saque>(`/contas/${saque.conta}/saque/`, saque);
  } catch (error) {
    console.error('Erro ao sacar da conta:', error);
    throw error;
  }
}

// Função para depositar um valor de uma conta
export async function depositoConta(deposito: Deposito): Promise<void> {
  try {
    await api.post<Deposito>(`/contas/${deposito.conta}/deposito/`, deposito);
  } catch (error) {
    console.error('Erro ao depositar na conta:', error);
    throw error;
  }
}

// Função para transferir um valor de uma conta para outra conta
export async function transferenciaEntreContas(
  transferencia: Transferencia
): Promise<void> {
  try {
    await api.post<Transferencia>(
      `/contas/${transferencia.conta_origem}/transferencia/`,
      transferencia
    );
  } catch (error) {
    console.error('Erro ao transferir de uma conta para outra:', error);
    throw error;
  }
}

export async function contaById(id: number) {
  try {
    const contas = await listContas();
    const result = contas.filter((conta) => conta.id === id);
    return result[0];
  } catch (error) {
    console.error('Erro ao buscar conta pelo id: ', error);
    throw error;
  }
}
