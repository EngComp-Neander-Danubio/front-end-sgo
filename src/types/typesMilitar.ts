export type OptionType = { label: string; value: string | number };

export enum Modaliade {
  "A PÉ" = '1',
  Viatura = '2',
  Moto = '3',
  Montado = '4',
  "Prontidão" = '5',
}
export enum Militar {
  Coronel = "1",
  TenCoronel = "2",
  Major = "3",
  'Capitão' = "4",
  PrimeiroTenente = "5",
  SegundoTenente = "6",
  SubTenente = "7",
  PrimeiroSargento = "8",
  SegundoSargento = "9",
  TerceiroSargento = "10",
  Cabo = "11",
  Soldado = "12",
  AlunoSoldado = "13",
  Aleatorio = '14',
}

export const optionsMilitares: Array<{ label: string; value: string; militarRank: Militar }> = [
  { label: 'Coronel', value: 'Cel PM', militarRank: Militar.Coronel },
  { label: 'Tenente-Coronel', value: 'Ten-Cel PM', militarRank: Militar.TenCoronel },
  { label: 'Major', value: 'Maj PM', militarRank: Militar.Major },
  { label: 'Capitão', value: 'Cap PM', militarRank: Militar.Capitão },
  { label: '1° Tenente', value: '1º Ten PM', militarRank: Militar.PrimeiroTenente },
  { label: '2° Tenente', value: '2º Ten PM', militarRank: Militar.SegundoTenente },
  { label: 'Sub-Tenente', value: 'St PM', militarRank: Militar.SubTenente },
  { label: '1° Sargento', value: '1º Sgt PM', militarRank: Militar.PrimeiroSargento },
  { label: '2° Sargento', value: '2º Sgt PM', militarRank: Militar.SegundoSargento },
  { label: '3° Sargento', value: '3º Sgt PM', militarRank: Militar.TerceiroSargento },
  { label: 'Cabo', value: 'Cb PM', militarRank: Militar.Cabo },
  { label: 'Soldado', value: 'Sd PM', militarRank: Militar.Soldado },
  { label: 'Aluno-Soldado', value: 'Al Sd PM', militarRank: Militar.AlunoSoldado },
  { label: 'Aleatório', value: 'aleatorio', militarRank: Militar.Aleatorio },
];

export const columnsMapMilitar: {
  [key: string]: string;
} = {
  'id': 'id', // Exemplo: 'Ord' mapeia para 'id'
  'Matrícula': 'matricula',
  'Posto/Graduação': 'posto_grad',
  'Nome Completo': 'nome_completo',
  'Unidade': 'opm',
};

// Agora, defina a função para ordenar pela hierarquia de posto_grad
export const handleSortByPostoGrad = (militares: any[], type?: string) => {
  // Defina a ordem hierárquica das graduações (do menor para o maior)
  const hierarchy = [
    'Cel PM',
    'Ten-Cel PM',
    'Maj PM',
    'Cap PM',
    '1º Ten PM',
    '2º Ten PM',
    'St PM',
    '1º Sgt PM',
    '2º Sgt PM',
    '3º Sgt PM',
    'Cb PM',
    'Sd PM',
    'Al Sd PM',
  ];
  if (type === '1') {

    // Ordene os militares transformados de acordo com a hierarquia
    return militares.sort((a, b) => {
      const indexA = hierarchy.indexOf(a['Posto/Graduação']);
      const indexB = hierarchy.indexOf(b['Posto/Graduação']);

      // Compara os índices da hierarquia
      return indexA - indexB;
    });
  } else {
    return militares.sort((a, b) => {
      const indexA = hierarchy.indexOf(a['posto_grad']);
      const indexB = hierarchy.indexOf(b['posto_grad']);

      // Compara os índices da hierarquia
      return indexA - indexB;
    });
  }
};
// Define a função para comparar dois militares e retornar o de menor hierarquia
export const handleSortByPostoGradTwoMilitar = (militarOne: any, militarTwo: any, type?: string) => {
  // Defina a ordem hierárquica das graduações (do menor para o maior)
  const hierarchy = [
    'Cel PM',
    'Ten-Cel PM',
    'Maj PM',
    'Cap PM',
    '1º Ten PM',
    '2º Ten PM',
    'St PM',
    '1º Sgt PM',
    '2º Sgt PM',
    '3º Sgt PM',
    'Cb PM',
    'Sd PM',
    'Al Sd PM',
  ];

  // Determine o índice de cada militar na hierarquia
  const indexOne = hierarchy.indexOf(type === '1' ? militarOne['Posto/Graduação'] : militarOne['posto_grad']);
  const indexTwo = hierarchy.indexOf(type === '1' ? militarTwo['Posto/Graduação'] : militarTwo['posto_grad']);

  // Compare os índices para determinar quem tem menor hierarquia
  if (indexOne > indexTwo) {
    return true;
  } else {
    return false;
  }
};



export type OPMOption =
  | 'cgo'
  | '1crpm'
  | '2crpm'
  | '3crpm'
  | '4crpm'
  | 'cpe'
  | 'bpre'
  | 'bptur'
  | 'bpma'
  | 'rpmont'
  | 'bpgep'
  | 'cpchoque'
  | 'cotam'
  | 'bope'
  | 'bepi'
  | 'bpchoque'
  | 'copac'
  | 'cpraio'
  | '1bpm'
  | '2bpm'
  | '3bpm'
  | '4bpm'
  | '5bpm'
  | '6bpm'
  | '7bpm'
  | '8bpm'
  | '9bpm'
  | '10bpm'
  | '11bpm'
  | '12bpm'
  | '13bpm'
  | '14bpm'
  | '15bpm'
  | '16bpm'
  | '17bpm'
  | '18bpm'
  | '19bpm'
  | '20bpm'
  | '21bpm'
  | '22bpm'
  | '23bpm'
  | '24bpm'
  | '25bpm'
  | 'bsp'
  | '1cpg'
  | '2cpg'
  | '3cpg'
  | 'dpgi'
  | 'cetic'
  | 'codip'
  | 'colog'
  | 'coafi'
  | 'cgp'
  | 'cpmce'
  | 'csas'
  | 'cogepro'
  | 'cogei'
  | 'cpraio'
  | '1bpraio'
  | '2bpraio'
  | '3bpraio'
  | '4bpraio'
  | '5bpraio'
  | 'qcg'
  | '1cpg'
  | '2cpg'
  | '3cpg'
  | 'ccs'
  | 'cbmpm'
  | 'bsp'
  | 'cpjm'
  | null;


/* const transformedMiltitares = militaresRestantes.map(militar => {
  const transformedMilitar: {
    [key: string]: any;
  } = {};
  Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
    transformedMilitar[newKey] = militar[originalKey];
  });
  return transformedMilitar;
}); */

/*   const headerKeysMilitar =
    militaresRestantes.length > 0
      ? Object.keys(militaresRestantes[0]).filter(key =>
          ['matricula', 'posto_grad', 'nome_completo', 'opm'].includes(key),
        )
      : [];
 */
