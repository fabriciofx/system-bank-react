import type { PageResult } from '../core/PageResult';
import type { Cliente } from '../models/Cliente';
import api from './api';

// Função para buscar todos os clientes
export async function listClientes(): Promise<Cliente[]> {
  try {
    const response = await api.get<Cliente[]>('/clientes/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
}

// Função para buscar clientes paginado
export async function pagesClientes(
  num: number,
  size: number
): Promise<PageResult<Cliente>> {
  const all = await listClientes();
  const max = Math.ceil(all.length / size);
  if (num < 1 || num > max) {
    throw new Error(`Página fora do limite permitido (min: 1, max: ${max})`);
  }
  const url = `/clientes/?page=${num}&pageSize=${size}`;
  const clientes = await api.get<Cliente[]>(url);
  const result: PageResult<Cliente> = {
    items: clientes.data,
    page: num,
    pageSize: size,
    total: all.length
  };
  return result;
}

// Função para criar um cliente
export async function createCliente(cliente: Cliente): Promise<Cliente> {
  try {
    const response = await api.post<Cliente>('/clientes/', cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
}

// Função para atualizar um cliente
export async function updateCliente(
  id: number,
  clienteAtualizado: Cliente
): Promise<Cliente> {
  try {
    const response = await api.put<Cliente>(
      `/clientes/${id}/`,
      clienteAtualizado
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
}

// Função para deletar um cliente
export async function deleteCliente(id: number): Promise<void> {
  try {
    await api.delete<void>(`/clientes/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
}

// Função para buscar um cliente pelo id
export async function clienteById(id: number): Promise<Cliente[]> {
  try {
    const response = await api.get<Cliente>(`/clientes/${id}/`);
    if (response.data) {
      return [response.data];
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar cliente pelo id: ', error);
    throw error;
  }
}
