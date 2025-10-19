import api from './api';
import type { Cliente } from '../models/Cliente';

// Função para buscar todos os clientes
export async function getClientes(): Promise<Cliente[]> {
  try {
    const response = await api.get<Cliente[]>('/clientes/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
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
export async function deleteCliente(id: number) {
  try {
    await api.delete<Cliente>(`/clientes/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
}
