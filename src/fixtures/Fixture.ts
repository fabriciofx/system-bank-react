export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomCpf(): string {
  const num = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  let soma1 = 0;
  for (let i = 0; i < 9; i++) {
    soma1 += num[i] * (10 - i);
  }
  let digito1 = 11 - (soma1 % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }
  let soma2 = 0;
  for (let i = 0; i < 9; i++) {
    soma2 += num[i] * (11 - i);
  }
  soma2 += digito1 * 2;
  let digito2 = 11 - (soma2 % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }
  const cpf = [...num, digito1, digito2].join('');
  return cpf;
}

export function randomNome(): string {
  const primeiros = [
    'Ana',
    'Bruno',
    'Carla',
    'Daniel',
    'Eduardo',
    'Fernanda',
    'Gabriel',
    'Helena',
    'Igor',
    'Julia',
    'Lucas',
    'Mariana',
    'Nicolas',
    'Olivia',
    'Paulo',
    'Rafaela',
    'Samuel',
    'Tatiana',
    'Vinicius'
  ];
  const sobrenomes = [
    'Silva',
    'Santos',
    'Oliveira',
    'Souza',
    'Lima',
    'Pereira',
    'Ferreira',
    'Costa',
    'Rodrigues',
    'Almeida',
    'Nascimento',
    'Araujo',
    'Carvalho',
    'Gomes',
    'Martins',
    'Barbosa',
    'Ribeiro',
    'Teixeira',
    'Melo',
    'Cardoso'
  ];
  const primeiro = primeiros[Math.floor(Math.random() * primeiros.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return `${primeiro} ${sobrenome}`;
}

export function randomEmail(): string {
  const primeiros = [
    'ana',
    'bruno',
    'carla',
    'daniel',
    'eduardo',
    'fernanda',
    'gabriel',
    'helena',
    'igor',
    'julia',
    'lucas',
    'mariana',
    'nicolas',
    'olivia',
    'paulo',
    'rafaela',
    'samuel',
    'tatiana',
    'vinicius'
  ];
  const sobrenomes = [
    'silva',
    'santos',
    'oliveira',
    'souza',
    'lima',
    'pereira',
    'ferreira',
    'costa',
    'rodrigues',
    'almeida',
    'carvalho',
    'gomes',
    'ribeiro'
  ];
  const dominios = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'icloud.com',
    'proton.me',
    'example.com'
  ];
  const primeiro = primeiros[Math.floor(Math.random() * primeiros.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const numero = Math.random() < 0.5 ? '' : Math.floor(Math.random() * 10000);
  const separador = Math.random() < 0.5 ? '.' : '_';
  const dominio = dominios[Math.floor(Math.random() * dominios.length)];
  return `${primeiro}${separador}${sobrenome}${numero}@${dominio}`;
}
