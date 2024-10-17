import React, { createContext, useState, ReactNode, useMemo } from 'react';

import { useToast } from '@chakra-ui/react';
import soli_data from '../../assets/solicitacoes_pms.json';

export type SolicitacoesPM = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface SolicitacoesPMData {
  operacao: string;
  solicitacao: string;
  prazoFinal: Date;
  prazoInicial: Date;
  qtd_efetivo: string | number;
  qtd_parcial_efetivo: string | number;
  status: string;
  [key: string]: any;
}

export interface IContextSolicitacoesPMData {
  solicitacoesPMs: SolicitacoesPMData[];
  loadMoreSolicitacoesPMs: () => void;
  loadLessSolicitacoesPMs: () => void;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesPMContext = createContext<
  IContextSolicitacoesPMData | undefined
>(undefined);

export const SolicitacoesPMsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(15);
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = soli_data.length;
  const currentData = soli_data.slice(firstDataIndex, lastDataIndex);

  const loadMoreSolicitacoesPMs = () => {
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

  const loadLessSolicitacoesPMs = () => {
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
      solicitacoesPMs: currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPMs,
      loadLessSolicitacoesPMs,
    }),
    [
      currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPMs,
      loadLessSolicitacoesPMs,
    ],
  );

  return (
    <SolicitacoesPMContext.Provider value={contextValue}>
      {children}
    </SolicitacoesPMContext.Provider>
  );
};
