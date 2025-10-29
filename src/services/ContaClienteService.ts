import type { PageResult } from '../core/PageResult';
import type { ContaCliente } from '../models/ContaCliente';
import { listClientes } from './ClienteService';
import { listContas, pagesContas } from './ContaService';

// Função para buscar contas-cliente paginada
export async function pagesContasClientes(
  num: number,
  size: number
): Promise<PageResult<ContaCliente>> {
  const [all, contas, clientes] = await Promise.all([
    listContas(),
    pagesContas(num, size),
    listClientes()
  ]);
  const map = new Map(clientes.map((cliente) => [cliente.id, cliente]));
  const contasClientes = contas.items.map((conta) => {
    const contaCliente: ContaCliente = {
      id: conta.id,
      cliente: map.get(conta.cliente) ?? clientes[0],
      numero: conta.numero,
      agencia: conta.agencia,
      saldo: conta.saldo
    };
    return contaCliente;
  });
  const result: PageResult<ContaCliente> = {
    items: contasClientes,
    page: num,
    pageSize: size,
    total: all.length
  };
  return result;
}
