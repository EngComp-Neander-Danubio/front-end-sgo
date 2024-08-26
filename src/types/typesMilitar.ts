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
  { label: '1° Tenente', value: '1º-Ten PM', militarRank: Militar.PrimeiroTenente },
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