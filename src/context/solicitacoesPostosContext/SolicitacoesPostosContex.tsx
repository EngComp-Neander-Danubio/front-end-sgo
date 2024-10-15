import React, { createContext, useState, ReactNode, useMemo } from 'react';

import { useToast } from '@chakra-ui/react';
import soli_data from '../../assets/solitacoes_postos.json';

export type SolicitacoesPosto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface SolicitacoesPostoData {
  operacao: string;
  solicitacao: string;
  prazoFinal: Date;
  prazoInicio: Date;
  bairro: string;
  qtd_postos: string | number;
  status: string;
  [key: string]: any;
}

export interface IContextSolicitacoesPostoData {
  solicitacoesPostos: SolicitacoesPostoData[];
  loadMoreSolicitacoesPostos: () => void;
  loadLessSolicitacoesPostos: () => void;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesPostosContext = createContext<
  IContextSolicitacoesPostoData | undefined
>(undefined);

export const SolicitacoesPostosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();

  // Estado para armazenar os dados paginados de solicitações
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(15); // Defina o número de registros por página

  // Calcule os índices de início e fim da paginação
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = soli_data.length;
  // Dados paginados baseados no índice atual
  const currentData = soli_data.slice(firstDataIndex, lastDataIndex);

  // Função para carregar mais dados (avanço de página)
  const loadMoreSolicitacoesPostos = () => {
    if (lastDataIndex < soli_data.length) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais solicitações para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Função para carregar menos dados (voltar página)
  const loadLessSolicitacoesPostos = () => {
    if (firstDataIndex > 0) {
      setCurrentDataIndex(prevIndex => prevIndex - 1);
    } else {
      toast({
        title: 'Início dos dados',
        description: 'Você está na primeira página.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const contextValue = useMemo(
    () => ({
      solicitacoesPostos: currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPostos,
      loadLessSolicitacoesPostos,
    }),
    [
      currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPostos,
      loadLessSolicitacoesPostos,
    ],
  );

  return (
    <SolicitacoesPostosContext.Provider value={contextValue}>
      {children}
    </SolicitacoesPostosContext.Provider>
  );
};
