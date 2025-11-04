const urlBase = 'https://aula-angular.bcorp.tec.br/api';
const urlAuth = `${urlBase}/token/`;

type AuthTokens = {
  refresh: string;
  access: string;
};

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  observacoes: string;
  ativo: boolean;
};

async function authenticate(url: string): Promise<AuthTokens | undefined> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: '12345678'
      })
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.statusText}: ${text}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function clientesPaginated(
  tokens: AuthTokens,
  page: number,
  size: number
): Promise<Cliente[] | undefined> {
  const url = `${urlBase}/clientes/?page=${page}&pageSize=${size}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.access}`
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.statusText}: ${text}`);
  }
  return await response.json();
}

async function createCliente(
  tokens: AuthTokens,
  cliente: Cliente
): Promise<Cliente> {
  const url = `${urlBase}/clientes/`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access}`
    },
    body: JSON.stringify(cliente)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.statusText}: ${text}`);
  }
  return await response.json();
}

async function updateCliente(
  tokens: AuthTokens,
  cliente: Cliente
): Promise<Cliente> {
  const url = `${urlBase}/clientes/${cliente.id}/`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access}`
    },
    body: JSON.stringify(cliente)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.statusText}: ${text}`);
  }
  return await response.json();
}

async function clienteById(tokens: AuthTokens, id: number): Promise<Cliente> {
  const url = `${urlBase}/clientes/${id}/`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.access}`
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.statusText}: ${text}`);
  }
  return await response.json();
}

async function deleteCliente(tokens: AuthTokens, id: number): Promise<void> {
  const url = `${urlBase}/clientes/${id}/`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${tokens.access}`
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.statusText}: ${text}`);
  }
}

async function main(): Promise<void> {
  const auth = await authenticate(urlAuth);
  if (auth) {
    const pages = await clientesPaginated(auth, 1, 10000);
    console.log(pages);
    const created = await createCliente(auth, {
      id: 0,
      nome: 'Teste CMD',
      cpf: '12634297640',
      email: 'teste@teste.com',
      observacoes: 'Nada a declarar',
      ativo: true
    });
    console.log(created);
    const updated = await updateCliente(auth, {
      id: 61,
      nome: 'Teste CMD 2',
      cpf: '12634297640',
      email: 'teste@teste.com',
      observacoes: 'Nada a declarar',
      ativo: true
    });
    console.log(updated);
    const cliente = await clienteById(auth, 61);
    console.log(cliente);
    await deleteCliente(auth, 62);
  }
}

main();
