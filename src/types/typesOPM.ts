export type OptionType = { label: string; value: string | number };

export enum OPMs {
  CoordenadoriaGeraldeOperaçoes = "cgo",
  ComandoDePoliciamentoDaCapital = "1crpm",
  ComandoDePoliciamentoMetropolitano = "2crpm",
  ComandoDePoliciamentoDoInteriorNorte = "3crpm",
  ComandoDePoliciamentoDoInteriorSul = "4crpm",
  ComandoDePoliciamentoEspecializado = "cpe",
  BatalhaoDePoliciaDeTransitoUrbanoERodoviarioEstadual = "bpre",
  BatalhaoDePoliciamentoTuristico = "bptur",
  BatalhaoDePoliciaDeMeioAmbiente = "bpma",
  RegimentoDePoliciaMontada = "rpmont",
  BatalhaoDePoliciamentoDeGuardaExternaDosPresidios = "bpgep",
  ComandoDePoliciamentoDeChoque = "cpchoque",
  BatalhaoDeComandoTaticoMotorizado = "cotam",
  BatalhaoDeOperacoesPoliciaisEspeciais = "bope",
  BatalhaoEspecializadoEmPoliciamentoDoInterior = "bepi",
  BatalhaoDePoliciaDeChoque = "bpchoque",
  ComandoDePrevencaoEApoioAsComunidades = "copac",
  ComandoDePoliciamentoDeRondasDeAcoesIntensivasEOstensivas = "Comando de Policiamento de Rondas de Ações Intensivas e Ostensivas – CPRAIO",
  PrimeiroBPM = "1º BPM (Russas)",
  SegundoBPM = "2º BPM (Juazeiro do Norte)",
  TerceiroBPM = "3º BPM (Sobral)",
  QuartoBPM = "4º BPM (Canindé)",
  QuintoBPM = "5º BPM (Centro – Fortaleza)",
  SextoBPM = "6º BPM (Parangaba – Fortaleza)",
  SetimoBPM = "7º BPM (Crateús)",
  OitavoBPM = "8º BPM (Aldeota – Fortaleza)",
  NonoBPM = "9º BPM (Quixadá)",
  DecimoBPM = "10º BPM (Iguatu)",
  DecimoPrimeiroBPM = "11º BPM (Itapipoca)",
  DecimoSegundoBPM = "12º BPM (Caucaia)",
  DecimoTerceiroBPM = "13º BPM (Tauá)",
  DecimoQuartoBPM = "14º BPM (Maracanaú)",
  DecimoQuintoBPM = "15º BPM (Eusébio)",
  DecimoSextoBPM = "16º BPM (Messejana – Fortaleza)",
  DecimoSetimoBPM = "17º BPM (Cj. Ceará – Fortaleza)",
  DecimoOitavoBPM = "18º BPM (Antônio Bezerra – Fortaleza)",
  DecimoNonoBPM = "19º BPM (Tancredo Neves – Fortaleza)",
  VigesimoBPM = "20º BPM (Cristo Redentor – Fortaleza)",
  VigesimoPrimeiroBPM = "21º BPM (Cj. Esperança – Fortaleza)",
  VigesimoSegundoBPM = "22º BPM (Papicu – Fortaleza)",
  VigesimoTerceiroBPM = "23º BPM (Paracuru)",
  VigesimoQuartoBPM = "24º BPM (Maranguape)",
  VigesimoQuintoBPM = "25º BPM (Horizonte)",
  BatalhaoDeSegurancaPatrimonial = "Batalhão de Segurança Patrimonial – BSP",
  PrimeiraCPG = "1ª CPG – Casa Militar – Fortaleza-Ce",
  SegundaCPG = "2ª CPG – Assembléia Legislativa do Ceará – Fortaleza – Ce",
  TerceiraCPG = "3ª CPG – Palácio da Justiça – Fortaleza – Ce",
}

export const optionsOPMs: OptionType[] = [
  { label: 'Coordenadoria Geral de Operações - CGO', value: 'cgo' },
  { label: 'Comando de Policiamento da Capital – 1º CRPM', value: '1crpm' },
  { label: 'Comando de Policiamento Metropolitano – 2º CRPM', value: '2crpm' },
  { label: 'Comando de Policiamento do Interior Norte – 3º CRPM', value: '3crpm' },
  { label: 'Comando de Policiamento do Interior Sul – 4º CRPM', value: '4crpm' },
  { label: 'Comando de Policiamento Especializado – CPE', value: 'cpe' },
  { label: 'Batalhão de Polícia de Trânsito Urbano e Rodoviário Estadual – BPRE', value: 'bpre' },
  { label: 'Batalhão de Policiamento Turístico – BPTUR', value: 'bptur' },
  { label: 'Batalhão de Polícia de Meio Ambiente – BPMA', value: 'bpma' },
  { label: 'Regimento de Policia Montada – RPMONT', value: 'rpmont' },
  { label: 'Batalhão de Policiamento de Guarda Externa dos Presídios – BPGEP', value: 'bpgep' },
  { label: 'Comando de Policiamento de Choque – CPChoque', value: 'cpchoque' },
  { label: 'Batalhão de Comando Tático Motorizado – COTAM', value: 'cotam' },
  { label: 'Batalhão de Operações Policiais Especiais – BOPE', value: 'bope' },
  { label: 'Batalhão Especializado em Policiamento do Interior – BEPI', value: 'bepi' },
  { label: 'Batalhão de Polícia de Choque – BPCHOQUE', value: 'bpchoque' },
  { label: 'Comando de Prevenção e Apoio às Comunidades – COPAC', value: 'copac' },
  { label: 'Comando de Policiamento de Rondas de Ações Intensivas e Ostensivas – CPRAIO', value: 'cpraio' },
  { label: '1º BPM (Russas)', value: '1bpm' },
  { label: '2º BPM (Juazeiro do Norte)', value: '2bpm' },
  { label: '3º BPM (Sobral)', value: '3bpm' },
  { label: '4º BPM (Canindé)', value: '4bpm' },
  { label: '5º BPM (Centro – Fortaleza)', value: '5bpm' },
  { label: '6º BPM (Parangaba – Fortaleza)', value: '6bpm' },
  { label: '7º BPM (Crateús)', value: '7bpm' },
  { label: '8º BPM (Aldeota – Fortaleza)', value: '8bpm' },
  { label: '9º BPM (Quixadá)', value: '9bpm' },
  { label: '10º BPM (Iguatú)', value: '10bpm' },
  { label: '11º BPM (Itapipoca)', value: '11bpm' },
  { label: '12º BPM (Caucaia)', value: '12bpm' },
  { label: '13º BPM (Tauá)', value: '13bpm' },
  { label: '14º BPM (Maracanaú)', value: '14bpm' },
  { label: '15º BPM (Eusébio)', value: '15bpm' },
  { label: '16º BPM (Messejana – Fortaleza)', value: '16bpm' },
  { label: '17º BPM (Cj. Ceará – Fortaleza)', value: '17bpm' },
  { label: '18º BPM (Antônio Bezerra – Fortaleza)', value: '18bpm' },
  { label: '19º BPM (Tancredo Neves – Fortaleza)', value: '19bpm' },
  { label: '20º BPM (Cristo Redentor – Fortaleza)', value: '20bpm' },
  { label: '21º BPM (Cj. Esperança – Fortaleza)', value: '21bpm' },
  { label: '22º BPM (Papicu – Fortaleza)', value: '22bpm' },
  { label: '23º BPM (Paracuru)', value: '23bpm' },
  { label: '24º BPM (Maranguape)', value: '24bpm' },
  { label: '25º BPM (Horizonte)', value: '25bpm' },
  { label: 'Batalhão de Segurança Patrimonial – BSP', value: 'bsp' },
  { label: '1ª CPG – Casa Militar – Fortaleza-Ce', value: '1cpg' },
  { label: '2ª CPG – Assembléia Legislativa do Ceará – Fortaleza – Ce', value: '2cpg' },
  { label: '3ª CPG – Palácio da Justiça – Fortaleza – Ce', value: '3cpg' },
];

export const options1CRPM: OptionType[] = [
  // ... outras opções
  { label: '5º BPM (Centro – Fortaleza)', value: '5bpm' },
  { label: '6º BPM (Parangaba – Fortaleza)', value: '6bpm' },
  { label: '8º BPM (Aldeota – Fortaleza)', value: '8bpm' },
  { label: '16º BPM (Messejana – Fortaleza)', value: '16bpm' },
  { label: '17º BPM (Cj. Ceará – Fortaleza)', value: '17bpm' },
  { label: '18º BPM (Antônio Bezerra – Fortaleza)', value: '18bpm' },
  { label: '19º BPM (Tancredo Neves – Fortaleza)', value: '19bpm' },
  { label: '20º BPM (Cristo Redentor – Fortaleza)', value: '20bpm' },
  { label: '21º BPM (Cj. Esperança – Fortaleza)', value: '21bpm' },
  { label: '22º BPM (Papicu – Fortaleza)', value: '22bpm' },
];

export const options2CRPM: OptionType[] = [
  // ... outras opções
  { label: '14º BPM (Maracanaú)', value: '14bpm' },
  { label: '15º BPM (Eusébio)', value: '15bpm' },
  { label: '23º BPM (Paracuru)', value: '23bpm' },
  { label: '24º BPM (Maranguape)', value: '24bpm' },
  { label: '25º BPM (Horizonte)', value: '25bpm' },
];
export const options3CRPM: OptionType[] = [
  // ... outras opções
  { label: '3º BPM (Sobral)', value: '3bpm' },
  { label: '4º BPM (Canindé)', value: '4bpm' },
  { label: '7º BPM (Crateús)', value: '7bpm' },
  { label: '11º BPM (Itapipoca)', value: '11bpm' },
  { label: '1ª CIPM (Morada Nova)', value: '1cipm' },
  { label: '2ª CIPM (Catunda)', value: '2cipm' },
  { label: '3ª CIPM (Amontada)', value: '3cipm' },
  { label: 'Comando de Policiamento do Interior Norte – 3º CRPM', value: '3crpm' },
];
export const options4CRPM: OptionType[] = [
  // ... outras opções
  { label: 'Comando de Policiamento do Interior Sul – 4º CRPM', value: '4crpm' },
  { label: '1º BPM (Russas)', value: '1bpm' },
  { label: '2º BPM (Juazeiro do Norte)', value: '2bpm' },
  { label: '9º BPM (Quixadá)', value: '9bpm' },
  { label: '10º BPM (Iguatú)', value: '10bpm' },
  { label: '13º BPM (Tauá)', value: '13bpm' },
  { label: '1ª CIPM (Morada Nova)', value: '1cipm' },
  { label: '2ª CIPM (Catunda)', value: '2cipm' },
  { label: '3ª CIPM (Amontada)', value: '3cipm' },
  { label: '4ª CIPM (Santa Quitéria)', value: '4cipm' },
  { label: '5ª CIPM (Nova Russas)', value: '5cipm' },
];


/* 1CRPM
5BPM
6BPM
8BPM
16BPM
17BPM
18BPM
19BPM
20BPM
21BPM
22BPM */

/* 12BPM
14BPM
15BPM
23BPM
24BPM
25BPM */

/* 3CRPM
3BPM
4BPM
7BPM
11BPM
1CIPM
2CIPM
3CIPM
 */

/* 4CRPM
1BPM
2BPM
9BPM
10BPM
13BPM
1CIPM
2CIPM
3CIPM
4CIPM
5CIPM
 */

/* CPE
RPMONT
BPMA
BPTUR
PRE
BPGEP
 */

/* ASSCOM
COPAC
 */

/* QCG
1CPG
2CPG
3CPG
CCS
CBMPM
BSP
CPJM
 */


/* DPGI
CETIC
CODIP
COLOG
COAFI
CGP
CPMCE
CSAS
COGEPRO
COGEI
 */

/* CGO
1CRPM
2CRPM
3CRPM
4CRPM
CPE
CPCHOQUE
CPRAIO
 */
